const fs = require('fs')
const pdfParse = require('pdf-parse')
const mammoth = require('mammoth')
const { openai } = require('../config/openai.config')
const { extractBasicInfo } = require('../utils/fileParser')

exports.parseResumeFile = async (file) => {
  let resumeText = ''

  if (file.mimetype === 'application/pdf') {
    const data = await pdfParse(fs.readFileSync(file.path))
    resumeText = data.text
  } else if (
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const data = await mammoth.extractRawText({ path: file.path })
    resumeText = data.value
  } else {
    fs.unlinkSync(file.path)
    throw new Error('Unsupported file type')
  }

  fs.unlinkSync(file.path)
  const trimmedText = resumeText.slice(0, 4000)
  const basicInfo = extractBasicInfo(resumeText)

  const aiResponse = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [
      {
        role: 'system',
        content: `You are a resume parser. Return structured JSON with fields: name, email, phoneNumber, summary, skills[], workExperiences[], education[], projects[], etc.`,
      },
      {
        role: 'user',
        content: trimmedText,
      },
    ],
    temperature: 0.2,
  })
  const rawContent = aiResponse.choices[0].message.content || ''

  // Remove triple backticks and parse the string
  let parsedJson = {}
  try {
    const cleaned = rawContent.replace(/```json|```/g, '').trim()
    parsedJson = JSON.parse(cleaned)
    console.log(parsedJson);
    
  } catch (err) {
    console.error('❌ Failed to parse GPT response:', err)
    throw new Error('Invalid JSON returned from GPT')
  }

  return {
    basicInfo,
    parsed: aiResponse.choices[0].message.content,
  }
}

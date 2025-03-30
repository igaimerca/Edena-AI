const fs = require('fs')
const pdfParse = require('pdf-parse')
const mammoth = require('mammoth')
const { openai } = require('../config/openai.config')
const { extractBasicInfo } = require('../utils/fileParser')
const UserProfile = require('../models/profile')

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
        content: `
        You are a professional resume parser API. You always return structured JSON **strictly** matching the following schema. Do not add or remove any fields.
        
        Here is the schema:
        
        {
          "name": string,
          "email": string,
          "phoneNumber": string,
          "location": string,
          "linkedin": string,
          "github": string,
          "portfolio": string,
          "website": string,
          "languages": string[],
        
          "summary": string,
          "skills": string[],
        
          "workExperiences": [
            {
              "title": string,
              "company": string,
              "location": string,
              "startDate": string,
              "endDate": string,
              "achievements": string[]
            }
          ],
        
          "education": [
            {
              "institution": string,
              "location": string,
              "degree": string,
              "fieldOfStudy": string,
              "startDate": string,
              "endDate": string
            }
          ],
        
          "projects": [
            {
              "name": string,
              "description": string,
              "duration": string,
              "technologies": string[],
              "achievements": string[],
              "link": string
            }
          ],
        
          "volunteerExperiences": [
            {
              "role": string,
              "organization": string,
              "location": string,
              "startDate": string,
              "endDate": string,
              "contributions": string[]
            }
          ],
        
          "certifications": [
            {
              "title": string,
              "issuer": string,
              "issueDate": string,
              "expiryDate": string,
              "credentialId": string,
              "credentialUrl": string
            }
          ],
        
          "awards": [
            {
              "title": string,
              "issuer": string,
              "date": string,
              "description": string
            }
          ],
        
          "publications": [
            {
              "title": string,
              "publisher": string,
              "date": string,
              "link": string,
              "description": string
            }
          ]
        }
        
        If data is missing in the resume, use null, an empty string, or an empty array — but do NOT remove the key.
        
        Only respond with raw JSON. Do not include any markdown, code blocks, or commentary.
        `
      },
      {
        role: 'user',
        content: trimmedText,
      },
    ],
    temperature: 0.2,
  })

  const rawContent = aiResponse.choices[0].message.content || ''
  const cleaned = rawContent.replace(/```json|```/g, '').trim()

  let parsedJson = {}
  try {
    parsedJson = JSON.parse(cleaned)
  } catch (err) {
    console.error('❌ Failed to parse JSON from GPT:', err)
    throw new Error('Invalid JSON returned from GPT')
  }

  // Save to MongoDB
  const resumeDoc = new UserProfile(parsedJson)
  await resumeDoc.save()

  return {
    basicInfo,
    parsed: parsedJson,
    saved: true
  }
}

const { parseResumeFile } = require('../services/resume.service')

exports.uploadResume = async (req, res) => {
  try {
    const file = req.file
    if (!file) return res.status(400).json({ error: 'No file uploaded' })

    const parsedData = await parseResumeFile(file)

    res.json(parsedData)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to parse resume' })
  }
}

const { parseResumeFile } = require('../services/profile.service')
const UserProfile = require('../models/profile')

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

exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params
    const profile = await UserProfile.findById(id)

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' })
    }

    res.json(profile)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
}

const User = require('../models/User.model')

// POST /api/users
exports.createOrGetUser = async (req, res) => {
  try {
    const { firebaseUid, email, displayName, photoURL } = req.body

    if (!firebaseUid || !email) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    let user = await User.findOne({ firebaseUid })

    if (!user) {
      user = await User.create({ firebaseUid, email, displayName, photoURL })
    }

    res.json({ user })
  } catch (err) {
    console.error('User Save Error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

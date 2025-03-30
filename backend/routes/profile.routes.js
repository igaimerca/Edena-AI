const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload.middleware')
const { uploadResume, getProfileById } = require('../controllers/profile')

router.post('/upload-resume', upload.single('resume'), uploadResume)
router.get('/:id', getProfileById)

module.exports = router

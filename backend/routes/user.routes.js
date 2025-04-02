const express = require('express')
const router = express.Router()
const { createOrGetUser } = require('../controllers/user.controller')

router.post('/', createOrGetUser)

module.exports = router

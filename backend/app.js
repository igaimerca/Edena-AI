const express = require('express')
const cors = require('cors')
const profileRoutes = require('./routes/profile.routes')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/profile', profileRoutes)

module.exports = app

const express = require('express')
const cors = require('cors')
const profileRoutes = require('./routes/profile.routes')
const interviewRoutes = require('./routes/interview.routes')
const userRoutes = require('./routes/user.routes')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/profile', profileRoutes)
app.use('/api/interview', interviewRoutes)
app.use('/api/users', userRoutes)

module.exports = app

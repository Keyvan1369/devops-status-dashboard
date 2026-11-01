require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')


const app = express()

app.use(cors())
app.use(express.json())
app.use(helmet())

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' }
})

app.use('/api', apiLimiter)

const githubRoutes = require('./routes/githubRoutes')
app.use('/api/github', githubRoutes)

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.json({
    message: 'DevOps Dashboard API is running!',
    status: 'OK'
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

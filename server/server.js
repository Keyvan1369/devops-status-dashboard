require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_ORIGIN }))
app.use(express.json())

app.set('trust proxy', 1)

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    githubTokenConfigured: Boolean(process.env.GITHUB_TOKEN)
  })
})

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

app.get('/', (req, res) => {
  res.json({
    message: 'DevOps Dashboard API is running!',
    status: 'OK'
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
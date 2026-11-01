require('dotenv').config()
const express = require('express')
const cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())

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

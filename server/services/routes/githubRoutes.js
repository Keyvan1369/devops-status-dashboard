
const express = require('express')

const router = express.Router()

const {
  getRepositories,
  getWorkflowRuns
} = require('../services/githubService')


router.get('/repos/:username', async (req, res) => {
  try {
    const repositories = await getRepositories(
      req.params.username
    )

    res.json(repositories)
  } catch (error) {
    console.error('GitHub API Error:', error.message)

    res.status(error.response?.status || 500).json({
      message: 'Failed to fetch GitHub repositories'
    })
  }
})


router.get('/repos/:username/:repoName/workflows', async (req, res) => {
  try {
    const workflows = await getWorkflowRuns(
      req.params.username,
      req.params.repoName
    )

    res.json(workflows)
  } catch (error) {
    console.error('Workflow API Error:', error.message)

    res.status(error.response?.status || 500).json({
      message: 'Failed to fetch workflow runs'
    })
  }
})

module.exports = router

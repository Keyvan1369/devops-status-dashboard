const express = require('express')

const {
  getRepositories,
  getWorkflowRuns
} = require('../services/githubService')

const router = express.Router()

const NAME_PATTERN = /^[A-Za-z0-9._-]{1,100}$/

function isValidName(value) {
  return NAME_PATTERN.test(value)
}

function sendGithubError(res, error, label, message) {
  console.error(
    label,
    error.response?.status,
    error.response?.data?.message || error.message
  )

  const status = error.response?.status
  const safeStatus = [401, 403, 404].includes(status) ? status : 500

  res.status(safeStatus).json({ message })
}

router.get('/repos/:username', async (req, res) => {
  const { username } = req.params

  if (!isValidName(username)) {
    return res.status(400).json({ message: 'Invalid username' })
  }

  try {
    const repositories = await getRepositories(username)
    res.json(repositories)
  } catch (error) {
    sendGithubError(
      res,
      error,
      'GitHub API Error:',
      'Failed to fetch GitHub repositories'
    )
  }
})

router.get('/repos/:username/:repoName/workflows', async (req, res) => {
  const { username, repoName } = req.params

  if (!isValidName(username) || !isValidName(repoName)) {
    return res
      .status(400)
      .json({ message: 'Invalid username or repository name' })
  }

  try {
    const workflows = await getWorkflowRuns(username, repoName)
    res.json(workflows)
  } catch (error) {
    sendGithubError(
      res,
      error,
      'Workflow API Error:',
      'Failed to fetch workflow runs'
    )
  }
})

module.exports = router
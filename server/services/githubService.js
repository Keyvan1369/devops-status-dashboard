
const axios = require('axios')

const GITHUB_API = 'https://api.github.com'

const githubClient = axios.create({
  baseURL: GITHUB_API,
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  },
  timeout: 10000
})

async function getRepositories(username) {
  const response = await githubClient.get(
    `/users/${username}/repos`,
    {
      params: {
        sort: 'updated',
        per_page: 100
      }
    }
  )

  return response.data
}

async function getWorkflowRuns(username, repoName) {
  const response = await githubClient.get(
    `/repos/${username}/${repoName}/actions/runs`,
    {
      params: {
        per_page: 1
      }
    }
  )

  return response.data.workflow_runs
}

module.exports = {
  getRepositories,
  getWorkflowRuns
}

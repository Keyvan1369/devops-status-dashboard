
const GITHUB_API = 'https://api.github.com'


export async function getRepositories(username) {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=100`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories')
    }

    const repositories = await response.json()

    return repositories
  } catch (error) {
    console.error('GitHub API Error:', error)
    throw error
  }
}

export async function getWorkflowRuns(username, repoName) {
  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${username}/${repoName}/actions/runs?per_page=1`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch workflows for ${repoName}`)
    }

    const data = await response.json()

    return data.workflow_runs
  } catch (error) {
    console.error('GitHub Actions API Error:', error)
    throw error
  }
}


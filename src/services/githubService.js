const API_BASE_URL = 'http://localhost:5000/api/github'

export async function getRepositories(username) {
  try {
    const response = await fetch(`${API_BASE_URL}/repos/${username}`)

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories from backend server')
    }

    const repositories = await response.json()
    return repositories
  } catch (error) {
    console.error('Frontend API Error:', error)
    throw error
  }
}

export async function getWorkflowRuns(username, repoName) {
  try {
    const response = await fetch(`${API_BASE_URL}/repos/${username}/${repoName}/workflows`)

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return data || []
  } catch (error) {
    console.error('Frontend Workflow API Error:', error)
    return []
  }
}
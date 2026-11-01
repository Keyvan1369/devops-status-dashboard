const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const API_BASE_URL = `${BASE_URL}/api/github`

export async function getHealth() {
  const response = await fetch(`${BASE_URL}/health`)

  if (!response.ok) {
    throw new Error('Backend unhealthy')
  }

  return response.json()
}

export async function getRepositories(username) {
  try {
    const response = await fetch(`${API_BASE_URL}/repos/${username}`)

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories from backend server')
    }

    return await response.json()
  } catch (error) {
    console.error('Frontend API Error:', error)
    throw error
  }
}

export async function getWorkflowRuns(username, repoName) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/repos/${username}/${repoName}/workflows`
    )

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
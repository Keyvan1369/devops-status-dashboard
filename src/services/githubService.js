
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

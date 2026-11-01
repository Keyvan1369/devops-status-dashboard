
import { useEffect, useState } from 'react'
import { getRepositories } from './services/githubService'

const GITHUB_USERNAME = 'Keyvan1369'

function App() {
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchRepositories() {
      try {
        setLoading(true)
        const data = await getRepositories(GITHUB_USERNAME)
        setRepositories(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRepositories()
  }, [])

  return (
    <div className="dashboard">

      <nav className="navbar navbar-dark px-4">
        <span className="navbar-brand fw-bold">
          <i className="bi bi-cloud-check me-2"></i>
          DevOps Status
        </span>

        <span className="badge bg-success">GitHub Connected</span>
      </nav>

      <main className="container py-5">

        <div className="mb-5">
          <h1 className="fw-bold">Deployment Dashboard</h1>
          <p className="text-secondary">
            Monitoring GitHub repositories for {GITHUB_USERNAME}
          </p>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card dashboard-card">
              <div className="card-body">
                <i className="bi bi-github fs-2"></i>
                <h5 className="mt-3">Repositories</h5>
                <h2>{repositories.length}</h2>
                <small className="text-secondary">Public repositories</small>
              </div>
            </div>
          </div>
        </div>

        <h4 className="fw-bold mb-4">Your Repositories</h4>

        {loading && (
          <p>Loading GitHub repositories...</p>
        )}

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {!loading && !error && (
          <div className="row g-4">
            {repositories.map((repo) => (
              <div className="col-md-6 col-lg-4" key={repo.id}>
                <div className="card dashboard-card h-100">
                  <div className="card-body">
                    <h5 className="fw-bold text-dark">
                      <i className="bi bi-github me-2"></i>
                      {repo.name}
                    </h5>

                    <p className="text-secondary small">
                      {repo.description || 'No description available.'}
                    </p>

                    <div className="d-flex gap-3 small mb-3">
                      <span>
                        <i className="bi bi-star me-1"></i>
                        {repo.stargazers_count}
                      </span>

                      <span>
                        <i className="bi bi-diagram-2 me-1"></i>
                        {repo.forks_count}
                      </span>

                      <span>{repo.language || 'N/A'}</span>
                    </div>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-dark btn-sm"
                    >
                      View Repository
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  )
}

export default App

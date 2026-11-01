
function App() {
  return (
    <div className="dashboard">

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">
          <i className="bi bi-cloud-check me-2"></i>
          DevOps Status
        </span>

        <span className="badge bg-success">
          System Online
        </span>
      </nav>

      {/* Main Content */}
      <main className="container py-5">

        <div className="mb-5">
          <h1 className="fw-bold">
            Deployment Dashboard
          </h1>

          <p className="text-secondary">
            Monitor your GitHub repositories and deployments.
          </p>
        </div>

        {/* Statistics */}
        <div className="row g-4">

          <div className="col-md-4">
            <div className="card dashboard-card">
              <div className="card-body">
                <i className="bi bi-github fs-2"></i>
                <h5 className="mt-3">Repositories</h5>
                <h2>0</h2>
                <small className="text-secondary">
                  GitHub projects
                </small>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card dashboard-card">
              <div className="card-body">
                <i className="bi bi-check-circle fs-2 text-success"></i>
                <h5 className="mt-3">Successful Deployments</h5>
                <h2>0</h2>
                <small className="text-secondary">
                  Last 7 days
                </small>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card dashboard-card">
              <div className="card-body">
                <i className="bi bi-clock-history fs-2 text-warning"></i>
                <h5 className="mt-3">Last Deployment</h5>
                <h2>--</h2>
                <small className="text-secondary">
                  Latest update
                </small>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  )
}

export default App

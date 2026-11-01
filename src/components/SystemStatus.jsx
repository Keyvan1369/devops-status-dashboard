import { useEffect, useState } from 'react'
import { getHealth } from '../services/githubService'

function SystemStatus() {
  const [health, setHealth] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true

    async function check() {
      try {
        const data = await getHealth()
        if (active) { setHealth(data); setFailed(false) }
      } catch {
        if (active) setFailed(true)
      }
    }

    check()
    const timer = setInterval(check, 30000)
    return () => { active = false; clearInterval(timer) }
  }, [])

  const ok = health && !failed
  const color = ok ? '#16a34a' : '#dc2626'

  return (
    <span style={{ color, fontWeight: 600, fontSize: 14 }}>
      {ok
        ? `● API Online · uptime ${Math.floor(health.uptimeSeconds / 60)}m`
        : '● API Offline'}
    </span>
  )
}

export default SystemStatus
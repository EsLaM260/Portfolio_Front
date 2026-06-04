import { useState, useEffect } from 'react'
import { fetchGithubUser, fetchGithubRepos } from '../api'

/**
 * Fetches GitHub profile + repos for the given username.
 * Returns { user, repos, loading, error }.
 */
export function useGithubData(username = 'EsLaM260') {
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const [userData, reposData] = await Promise.all([
          fetchGithubUser(username),
          fetchGithubRepos(username),
        ])
        if (!cancelled) {
          setUser(userData)
          setRepos(reposData)
        }
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [username])

  return { user, repos, loading, error }
}

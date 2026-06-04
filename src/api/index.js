import axios from 'axios'

// Axios instance — base URL points to EmailJS REST API
const emailClient = axios.create({
  baseURL: 'https://api.emailjs.com/api/v1.0',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// Response interceptor for global error handling
emailClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API Error]', err?.response?.data || err.message)
    return Promise.reject(err)
  }
)

/**
 * Send a contact form email via EmailJS REST API.
 * Falls back gracefully if env vars are missing.
 */
export async function sendContactEmail({ name, email, subject, message }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_stwgp4t'
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ej7fhu9'
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'MpQbJIH6cHJD93rp-'

  const payload = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      user_name: name,
      user_email: email,
      user_subject: subject,
      user_message: message,
    },
  }

  const response = await emailClient.post('/email/send', payload)
  return response.data
}

// ─── GitHub API (external REST API via Axios) ────────────────────────────────

const githubClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Accept: 'application/vnd.github+json' },
  timeout: 8000,
})

/**
 * Fetch public repos for a GitHub user.
 * Used to dynamically populate the Portfolio section (optional).
 */
export async function fetchGithubRepos(username = 'EsLaM260') {
  const response = await githubClient.get(`/users/${username}/repos`, {
    params: { sort: 'updated', per_page: 6, type: 'public' },
  })
  return response.data
}

/**
 * Fetch GitHub user profile info (avatar, bio, etc.)
 */
export async function fetchGithubUser(username = 'EsLaM260') {
  const response = await githubClient.get(`/users/${username}`)
  return response.data
}

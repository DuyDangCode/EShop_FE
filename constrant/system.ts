const BASE_URL_DEV =
  process.env.NEXT_PUBLIC_BASE_URL_DEV || 'http://localhost:8080/v1/api'
const X_API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''
const BASE_URL_PRO =
  process.env.NEXT_PUBLIC_BASE_URL_PRO || 'http://localhost:8080/v1/api'
const BASE_URL = BASE_URL_DEV

export { BASE_URL, X_API_KEY, BASE_URL_DEV }

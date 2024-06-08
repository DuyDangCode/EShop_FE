import { getCookie, setCookie, deleteCookie } from 'cookies-next'
import axios from 'axios'
import { BASE_URL, X_API_KEY } from '@/constrant/system'
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  ROLES,
  USER_ID,
} from './constrant/cookiesName'
import {
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_TIME,
} from './constrant/cookiesMaxAge'
import { cookies } from 'next/headers'
import { apiHelper } from './helper/router'

const apiInstance = axios.create({
  baseURL: BASE_URL,
})

apiInstance.interceptors.request.use(async (request) => {
  request.headers['x-api-key'] = X_API_KEY
  const userId = getCookie(USER_ID)
  request.headers['x-client-id'] = userId
  const accessToken = getCookie(ACCESS_TOKEN)
  const refreshToken = getCookie('refreshToken')

  if (!accessToken && refreshToken) {
    try {
      const res = await axios.post(
        apiHelper.handleRefreshToken(),
        {},
        {
          headers: {
            'x-api-key': X_API_KEY,
            'x-client-id': userId,
            'refresh-token': refreshToken,
          },
        },
      )
      const newAccessToken = res.data.metadata.accessToken
      const newRefreshToken = res.data.metadata.refreshToken
      setCookie(ACCESS_TOKEN, newAccessToken, {
        maxAge: ACCESS_TOKEN_TIME,
      })
      setCookie(REFRESH_TOKEN, newRefreshToken, {
        maxAge: REFRESH_TOKEN_TIME,
      })
      request.headers['authorization'] = newAccessToken
    } catch (error) {
      console.log(error)
    }
  } else {
    request.headers['authorization'] = accessToken
  }
  return request
})

apiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log('error', error.response)
    // deleteCookie(USER_ID)
    // deleteCookie(ACCESS_TOKEN)
    // deleteCookie(REFRESH_TOKEN)
    // deleteCookie(ROLES)
    return error
  },
)

export default apiInstance

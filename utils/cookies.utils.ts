import {
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_TIME,
  ROLES_TIME,
  USER_ID_TIME,
} from '@/constrant/cookiesMaxAge'
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  ROLES,
  USER_ID,
} from '@/constrant/cookiesName'
import { deleteCookie, setCookie, getCookie } from 'cookies-next'

const saveCookies = (
  accessToken: string,
  refreshToken: string,
  roles: string,
  userId: string,
): boolean => {
  try {
    setCookie(ACCESS_TOKEN, accessToken, { maxAge: ACCESS_TOKEN_TIME })
    setCookie(REFRESH_TOKEN, refreshToken, { maxAge: REFRESH_TOKEN_TIME })
    setCookie(ROLES, roles, { maxAge: ROLES_TIME })
    setCookie(USER_ID, userId, { maxAge: USER_ID_TIME })
    return true
  } catch (error) {
    return false
  }
}

const removeCookiesWhenLogout = () => {
  try {
    deleteCookie(USER_ID)
    deleteCookie(ACCESS_TOKEN)
    deleteCookie(REFRESH_TOKEN)
    deleteCookie(ROLES)
    return true
  } catch (error) {
    return false
  }
}

const getUserId = () => {
  return getCookie(USER_ID)
}
const getAuthentication = () => {
  return getCookie(ACCESS_TOKEN)
}

export { saveCookies, removeCookiesWhenLogout, getUserId, getAuthentication }

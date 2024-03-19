'use server'

import {
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_TIME,
  ROLES_TIME
} from '@/constrant/cookiesMaxAge'
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  ROLES,
  USER_ID
} from '@/constrant/cookiesName'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

const getUserServer = () => {
  const cookieStorage = cookies()
  const userId = cookieStorage.get(USER_ID)?.value
  const roles = cookieStorage.get(ROLES)?.value
  const accessToken = cookieStorage.get(ACCESS_TOKEN)?.value
  const refreshToken = cookieStorage.get(REFRESH_TOKEN)?.value

  if (userId && roles && accessToken && refreshToken) {
    return {
      userId,
      roles
    }
  }

  return {}
}

const setUserServer = ({
  userId,
  roles,
  accessToken,
  refreshToken
}: any): boolean => {
  const cookieStorage = cookies()
  if (!userId || !roles || !accessToken || !refreshToken) return false
  cookieStorage.set(USER_ID, userId, { maxAge: ACCESS_TOKEN_TIME })
  cookieStorage.set(ROLES, roles, { maxAge: ROLES_TIME })
  cookieStorage.set(ACCESS_TOKEN, accessToken, { maxAge: ACCESS_TOKEN_TIME })
  cookieStorage.set(REFRESH_TOKEN, refreshToken, {
    maxAge: REFRESH_TOKEN_TIME
  })
  return true
}

const redirectUserLogged = () => {
  if (getUserServer()?.userId) redirect('/')
}

const redirectUserUnLogged = () => {
  if (!getUserServer()?.userId) redirect('/')
}

const checkUserInRequest = (request: NextRequest) => {
  const userId = request.cookies.get(USER_ID)?.value
  const roles = request.cookies.get(ROLES)?.value
  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value
  if (userId && roles && accessToken && refreshToken) {
    return true
  }
  return false
}

const checkCustomerRole = (request: NextRequest) => {
  return checkRoles(request, 'customer')
}

const checkAdminRole = (request: NextRequest) => {
  return checkRoles(request, 'admin')
}

const checkRoles = (request: NextRequest, role = 'customer') => {
  const roles = request.cookies.get(ROLES)?.value
  if (roles === role) {
    return true
  }
  return false
}

export {
  getUserServer,
  setUserServer,
  redirectUserLogged,
  redirectUserUnLogged,
  checkUserInRequest,
  checkCustomerRole,
  checkAdminRole
}

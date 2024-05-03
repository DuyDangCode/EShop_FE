import { BASE_URL_DEV, BASE_URL } from '@/constrant/system'

const pathHelper = {
  signin: () => '/signin',
  signup: () => '/signup',
  product: (type: String) => `/products/${type}`,
  productDetail: (type: String, name: String) => `/products/${type}/${name}`,
  home: () => '/',
  404: () => '404',
  cart: () => '/cart',
  orders: () => '/orders',
}

const apiHelper = {
  signInDEV: () => `${BASE_URL_DEV}/users/signIn`,
  signUpDEV: () => `${BASE_URL_DEV}/users/signUp`,
  logoutDEV: () => `${BASE_URL_DEV}/users/signout`,
  signInPRO: () => `${BASE_URL_DEV}/users/signIn`,
  signUpPRO: () => `${BASE_URL_DEV}/users/signUp`,
  logoutPRO: () => `${BASE_URL_DEV}/users/signout`,
  getAllPublishedProductsPRO: (limit = 51, page = 1) =>
    `${BASE_URL_DEV}/products/published/all?limit=${limit}&page=${page}`,
}

export { pathHelper, apiHelper }

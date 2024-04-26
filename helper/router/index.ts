import { BASE_URL_DEV, BASE_URL } from '@/constrant/system'

const pathHelper = {
  signin: () => '/signin',
  signup: () => '/signup',
  product: (type: String) => `/products/${type}`,
  productDetail: (type: String, name: String) => `/products/${type}/${name}`,
  home: () => '/',
  404: () => '404',
  cart: () => '/cart'
}

const apiHelper = {
  signInDEV: () => `${BASE_URL_DEV}/users/signIn`,
  signUpDEV: () => `${BASE_URL_DEV}/users/signUp`,
  logoutDEV: () => `${BASE_URL_DEV}/users/signout`,
  signInPRO: () => `${BASE_URL}/users/signIn`,
  signUpPRO: () => `${BASE_URL}/users/signUp`,
  logoutPRO: () => `${BASE_URL}/users/signout`
}

export { pathHelper, apiHelper }

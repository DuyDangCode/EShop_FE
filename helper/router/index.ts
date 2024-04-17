import { BASE_URL_DEV } from '@/constrant/system'

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
  signIn: () => `${BASE_URL_DEV}/users/signIn`,
  signUp: () => `${BASE_URL_DEV}/users/signUp`,
  logout: () => `${BASE_URL_DEV}/users/signout`
}

export { pathHelper, apiHelper }

import { BASE_URL } from '@/constrant/system'

const pathHelper = {
  signin: () => '/signin',
  signup: () => '/signup',
  product: (type: String) => `/products/${type}`,
  productDetail: (type: String, name: String) => `/products/${type}/${name}`,
  home: () => '/',
  404: () => '404',
  cart: () => '/cart',
  orders: () => '/orders',
  checkout: () => '/checkout',
  orderDetail: (orderId: String) => `/orders/${orderId}`,
}

const authApi = {
  signInDEV: () => `${BASE_URL}/users/signIn`,
  signUpDEV: () => `${BASE_URL}/users/signUp`,
  logoutDEV: () => `${BASE_URL}/users/signout`,
  signInPRO: () => `${BASE_URL}/users/signIn`,
  signUpPRO: () => `${BASE_URL}/users/signUp`,
  logoutPRO: () => `${BASE_URL}/users/signout`,
  handleRefreshToken: () => `${BASE_URL}/users/handleRefreshtoken`,
}

const productApi = {
  getTotalPublishedProduct: (product_type: String) =>
    `${BASE_URL}/products/published/total?product_type=${product_type}`,
  getAllPublishedProducts: (limit = 10, page = 1) =>
    `${BASE_URL}/products/published/all?limit=${limit}&page=${page}`,
  getAllPublishedProductsByCategoryPRO: (
    product_type: string,
    limit = 10,
    page = 1,
  ) =>
    `${BASE_URL}/products/published/${product_type}?limit=${limit}&page=${page}`,
  getOneProductBySlug: (product_slug: string) =>
    `${BASE_URL}/products/published/one/${product_slug}`,
  cart: () => `${BASE_URL}/carts`,
  cartProduct: (productId = '') => `${BASE_URL}/carts/products/${productId}`,
}

const orderApi = {
  order: () => `${BASE_URL}/orders`,
  orders: () => `${BASE_URL}/orders/all`,
  totalOrder: () => `${BASE_URL}/orders/total`,
}

const apiHelper = {
  ...authApi,
  ...productApi,
  ...orderApi,
}

export { pathHelper, apiHelper }

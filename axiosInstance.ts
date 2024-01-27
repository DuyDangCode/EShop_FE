'use server';

import { cookies } from 'next/headers';
import axios from 'axios';
import { BASE_URL, X_API_KEY } from '@/constrant/system';

const cookieStorage = cookies();

const apiInstance = axios.create({
  baseURL: BASE_URL,
});

apiInstance.interceptors.request.use((request) => {
  request.headers['x-api-key'] = X_API_KEY;
  request.headers['authorization'] = cookieStorage.get('accessToken')?.value;
  request.headers['x-client-id'] = cookieStorage.get('userId')?.value;
  return request;
});

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('error', error.response);

    return error;
  }
);

export default apiInstance;

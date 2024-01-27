'use server';

import { cookies } from 'next/headers';
import axios from 'axios';
import { BASE_URL, X_API_KEY } from '@/constrant/system';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from './constrant/cookiesName';
import {
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_TIME,
} from './constrant/cookiesMaxAge';

const cookieStorage = cookies();

const apiInstance = axios.create({
  baseURL: BASE_URL,
});

apiInstance.interceptors.request.use(async (request) => {
  request.headers['x-api-key'] = X_API_KEY;
  const userId = cookieStorage.get(USER_ID)?.value;
  request.headers['x-client-id'] = userId;

  const accessToken = cookieStorage.get(ACCESS_TOKEN)?.value;
  if (!accessToken) {
    try {
      const res = await axios.post(
        `${BASE_URL}/users/handleRefreshtoken`,
        {},
        {
          headers: {
            'x-api-key': X_API_KEY,
            'x-client-id': userId,
            'refresh-token': cookieStorage.get('refreshToken')?.value,
          },
        }
      );
      const newAccessToken = res.data.metadata.accessToken;
      const newRefreshToken = res.data.metadata.refreshToken;
      cookieStorage.set(ACCESS_TOKEN, newAccessToken, {
        maxAge: ACCESS_TOKEN_TIME,
      });
      cookieStorage.set(REFRESH_TOKEN, newRefreshToken, {
        maxAge: REFRESH_TOKEN_TIME,
      });
      request.headers['authorization'] = newAccessToken;
      console.log('oke');
    } catch (error) {}
  } else {
    request.headers['authorization'] = accessToken;
  }
  return request;
});

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log('error', error.response);
    return error;
  }
);

export default apiInstance;

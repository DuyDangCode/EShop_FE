'use server';
import apiInstance from '@/axiosInstance';
import {
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_TIME,
  USER_ID_TIME,
} from '@/constrant/cookiesMaxAge';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  ROLES,
  USER_ID,
} from '@/constrant/cookiesName';
import { pathHelper } from '@/helper/router';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

const signIn = async (formState: {}, formData: FormData) => {
  try {
    const username = formData.get('username');
    const password = formData.get('password');
    const res = await apiInstance.post('/users/signIn', {
      username,
      password,
    });

    const cookieStorage = cookies();
    cookieStorage.set(ACCESS_TOKEN, res.data.metadata.accessToken, {
      maxAge: ACCESS_TOKEN_TIME,
    });
    cookieStorage.set(REFRESH_TOKEN, res.data.metadata.accessToken, {
      maxAge: REFRESH_TOKEN_TIME,
    });
    cookieStorage.set(USER_ID, res.data.metadata.accessToken, {
      maxAge: USER_ID_TIME,
    });

    cookieStorage.set(ROLES, res.data.metadata.roles, {
      maxAge: USER_ID_TIME,
    });

    return { message: 'Ok', status: 200 };
  } catch (error) {
    // console.log(error);
    return { message: 'Somthing went wrong', status: 500 };
  }

  cookies().set('aaa', Math.random().toString(), {
    maxAge: ACCESS_TOKEN_TIME,
  });

  cookies().delete('aaa');
  return { message: 'Somthing went wrong', status: Math.random() };

  // redirect(pathHelper.home());
};

const signOut = (formState: {}, formData: FormData) => {
  try {
    apiInstance.post('/users/signout');
    cookies().delete(USER_ID);
    cookies().delete(ACCESS_TOKEN);
    cookies().delete(REFRESH_TOKEN);
    cookies().delete(ROLES);
    return { message: 'Ok', status: 200 };
  } catch (error) {
    return { message: 'Somthing went wrong', status: 500 };
  }
};

export { signIn, signOut };

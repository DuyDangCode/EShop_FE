'use server';
import apiInstance from '@/axiosInstance';
import { pathHelper } from '@/helper/router';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

const signIn = async () => {
  console.log('a');
  try {
    const res = await apiInstance.post('/users/signIn', {
      username: 'av',
      password: '123456',
    });
  } catch (error) {
    // console.log(error);
  }

  //console.log('res', res);
};

export { signIn };

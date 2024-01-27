'use client';

import { signIn } from '@/actions/auth';
import UserContext from '@/context/userContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState, useTransition } from 'react';
import { useFormState } from 'react-dom';

export default function SigninForm() {
  const router = useRouter();
  const defaultFormState = {
    status: 0,
    message: '',
  };
  const [fromState, signInAction] = useFormState(signIn, defaultFormState);
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (fromState.status !== 0 && fromState.status !== 200) {
      setIsLoginFail(true);
      setTimeout(() => {
        setIsLoginFail(false);
      }, 5000);
    } else if (fromState.status === 200) {
      startTransition(async () => {
        try {
          const res = await axios.get('/api/me');
          setUser(res.data);
          router.replace('/');
        } catch (error) {}
      });
    }
  }, [fromState]);

  return (
    <form action={signInAction}>
      <div>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' id='username' required />
        <label htmlFor='password'>password</label>
        <input type='password' name='password' id='password' required />
      </div>
      {isLoginFail && <span>{fromState.message}</span>}
      <button type='submit'>Signin</button>
    </form>
  );
}

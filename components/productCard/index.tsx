'use client';

import { signOut } from '@/actions/auth';
import UserContext from '@/context/userContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState, useTransition } from 'react';
import { useFormState } from 'react-dom';

export default function ProductCard() {
  const router = useRouter();
  const defaultFormState = {
    status: 0,
    message: '',
  };
  const [fromState, signOutAction] = useFormState(signOut, defaultFormState);
  const [isLogoutFail, setIsLogoutFail] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (fromState.status !== 0 && fromState.status !== 200) {
      setIsLogoutFail(true);
      setTimeout(() => {
        setIsLogoutFail(false);
      }, 5000);
    } else if (fromState.status === 200) {
      startTransition(async () => {
        try {
          const res = await axios.get('/api/me');
          console.log(res.data);
          setUser({
            userId: res.data.userId,
            roles: res.data.roles,
          });
          // router.replace('/');
        } catch (error) {}
      });
    }
  }, [fromState]);
  return (
    <div>
      <form action={signOutAction}>
        <button type='submit'>LogOut</button>
      </form>
    </div>
  );
}

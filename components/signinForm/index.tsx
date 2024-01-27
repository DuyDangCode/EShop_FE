'use client';

import { signIn } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormState } from 'react-dom';

export default function SigninForm() {
  const router = useRouter();
  const [fromState, signInAction] = useFormState(signIn, null);

  return (
    <form action={signInAction}>
      <div>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' id='username' required />
        <label htmlFor='password'>password</label>
        <input type='password' name='password' id='password' required />
      </div>
      <button type='submit'>Signin</button>
    </form>
  );
}

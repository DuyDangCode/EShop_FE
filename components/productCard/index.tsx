'use client';

import { test } from '@/actions/auth';
import { useEffect } from 'react';

export default function ProductCard() {
  // const isLogin = await getServerSession();
  // console.log('isLogin', isLogin);
  return (
    <div className='h-[50px] w-[50px]'>
      <button onClick={() => {}}>signOut</button>
    </div>
    // <div>
    //   <form action={test}>
    //     {isLogin && <>logged</>}
    //     <button type='submit'>toast</button>
    //   </form>
    // </div>
  );
}

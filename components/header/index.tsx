'use client';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/images/logo.png';
import SearchImg from '@/public/images/gg_search.png';
import XSearchImg from '@/public/images/x_gg_search.png';
import CartExample from '@/public/images/cardExample.png';
import AvatarExample from '@/public/images/avatarExample.png';
import Search from '../search';
import { signOut } from '@/actions/auth';
import UserContext, { User } from '@/context/userContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState, useTransition } from 'react';
import { useFormState } from 'react-dom';

export default function Header() {
  const [search, setSearch] = useState(SearchImg);
  const openSearch = () => {
    search == SearchImg ? setSearch(XSearchImg) : setSearch(SearchImg);
  };
  const handleSearch = () => {
    console.log("I'm searching.");
  };

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
          // const res = await axios.get('/api/me');
          // console.log(res.data);
          // setUser({
          //   userId: res.data.userId,
          //   roles: res.data.roles,
          // });
          // router.replace('/');
        } catch (error) {}
      });
    }
  }, [fromState]);

  const data = [
    { id: 0, label: 'Laptops' },
    { id: 1, label: 'Desktop PCs' },
    { id: 2, label: 'Networking Devices' },
    { id: 3, label: 'Printers & Scanners  ' },
    { id: 4, label: 'PC Parts' },
    { id: 5, label: 'All Other Products' },
    { id: 6, label: 'Repairs' },
  ];
  const handleOnclick = (id: number) => {
    router.push(`/${data[id].label}`);
  };

  return (
    <div className='flex w-full px-[3rem] h-[60px]   gap-[2rem] bg-white'>
      <div className='flex flex-[1] h-full items-center justify-center'>
        <Link href={'/'}>
          <Image className=' h-[2rem] w-auto' src={Logo} alt='logo' />
        </Link>
      </div>

      {search == SearchImg ? (
        <div className='flex flex-[8] gap-[30px] items-center justify-center'>
          {data.map((item) => (
            <button
              className='w-auto bg-white text-[14px] text-black font-semibold cursor-pointer'
              key={item.id}
              onClick={() => handleOnclick(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button className=' h-fit w-fit p-1 rounded-[50px] border-2 border-color-3 text-color-3 font-semibold text-[14px]'>
            Our Deals
          </button>
        </div>
      ) : (
        //search
        <Search />
      )}
      <div className='flex-[1] flex items-center justify-center gap-7 '>
        <div className='flex items-center justify-center gap-5'>
          <Image
            src={search}
            alt='search bar'
            className='w-[20px] h-auto cursor-pointer'
            onClick={openSearch}
          />
          {user.userId && (
            <Image
              src={CartExample}
              alt='cards'
              className='w-[35px] h-auto mb-2'
            />
          )}
        </div>
        {user.userId && (
          <div>
            <Image
              src={AvatarExample}
              alt='avatar'
              className='w-[30px] h-[30px] mb-1'
            />
            <form action={signOutAction}>
              <button>Logout</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

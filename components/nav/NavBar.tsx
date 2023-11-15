'use client';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/images/logo.png';
import SearchImg from '@/public/images/gg_search.png';
import XSearchImg from '@/public/images/x_gg_search.png';
import CardExample from '@/public/images/cardExample.png';
import AvatarExample from '@/public/images/avatarExample.png';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const NavBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState(SearchImg);
  const openSearch = () => {
    search == SearchImg ? setSearch(XSearchImg) : setSearch(SearchImg);
  };
  const handleSearch = () => {
    console.log("I'm searching.");
  };

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
    <div className='flex w-full px-[3rem] h-[3rem] bg-white  gap-[2rem]'>
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
        <div className=' flex-[8] bg-color-1 rounded-[31px] my-2 relative'>
          <input
            className=' w-full h-full rounded-[31px] bg-transparent p-4 pr-[50px] outline-none'
            placeholder='Search entiere store here...'
            maxLength={100}
          />
          <Image
            src={SearchImg}
            alt='Search button'
            onClick={handleSearch}
            className='w-[20px] h-[20px] absolute right-[20px] top-[5px]'
          />
        </div>
      )}
      <div className='flex-[1] flex items-center justify-center gap-7 '>
        <div className='flex items-center justify-center gap-5'>
          <Image
            src={search}
            alt='search bar'
            className='w-[20px] h-auto mt-2'
            onClick={openSearch}
          />
          <Image src={CardExample} alt='cards' className='w-[35px] h-auto' />
        </div>
        <Image
          src={AvatarExample}
          alt='avatar'
          className='w-[30px] h-[30px] mt-1'
        />
      </div>
    </div>
  );
};

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
import Search from '../search';

export default function Header() {
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
          <Image
            src={CardExample}
            alt='cards'
            className='w-[35px] h-auto mb-2'
          />
        </div>
        <Image
          src={AvatarExample}
          alt='avatar'
          className='w-[30px] h-[30px] mb-1'
        />
      </div>
    </div>
  );
}

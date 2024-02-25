'use client'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/vector/logo.svg'
import SearchImg from '@/public/images/gg_search.png'
import XSearchImg from '@/public/images/x_gg_search.png'
import CartExample from '@/public/images/cardExample.png'
import AvatarExample from '@/public/images/avatarExample.png'
import Search from '../Search'
import { signOut } from '@/actions/auth'
import UserContext, { User } from '@/context/userContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState, useTransition } from 'react'
import { useFormState } from 'react-dom'
import { FaBars, FaCartShopping, FaUser } from 'react-icons/fa6'
import DropDownMenu from '../DropdownMenu'

export default function Header() {
  const [search, setSearch] = useState(SearchImg)
  const openSearch = () => {
    search == SearchImg ? setSearch(XSearchImg) : setSearch(SearchImg)
  }
  const handleSearch = () => {
    console.log('Im searching.')
  }

  const router = useRouter()
  const defaultFormState = {
    status: 0,
    message: ''
  }
  const [fromState, signOutAction] = useFormState(signOut, defaultFormState)
  const [isLogoutFail, setIsLogoutFail] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if (fromState.status !== 0 && fromState.status !== 200) {
      setIsLogoutFail(true)
      setTimeout(() => {
        setIsLogoutFail(false)
      }, 5000)
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
      })
    }
  }, [fromState])

  const data = [
    { id: 0, label: 'Laptops' },
    { id: 1, label: 'Desktop PCs' },
    { id: 2, label: 'Networking Devices' },
    { id: 3, label: 'Printers & Scanners  ' },
    { id: 4, label: 'PC Parts' },
    { id: 5, label: 'All Other Products' },
    { id: 6, label: 'Repairs' }
  ]
  const handleOnclick = (id: number) => {
    router.push(`/${data[id].label}`)
  }

  return (
    <div className=' flex-col h-[104px] w-full bg-color-3'>
      <div className='flex items-center justify-end gap-10 h-[40px] w-full bg-black relative'>
        <div className='flex justify-center items-start z-10 w-[64px] h-[60px] absolute bottom-[-30px] left-3 bg-color-3 rounded-full'>
          <Image
            src={Logo}
            alt='logo'
            height={20}
            className=' text-white mt-[10px]'
          />
        </div>
        <div className='flex gap-2'>
          <p className=' text-[80%] text-[#A2A6B0]'>Mon-Thu:</p>
          <p className=' text-[80%] text-white'>9:00 AM - 5:30 PM</p>
        </div>
        <div>
          <p className=' text-[80%] text-white mr-5'>Contact Us</p>
        </div>
      </div>
      <div className=' flex justify-around items-center'>
        <FaBars className='text-white z-50 text-[26px]' />
        <DropDownMenu
          items={['laptop', 'pc']}
          actions={[
            () => {
              console.log('laptop')
            },
            () => {
              console.log('pc')
            }
          ]}
        />

        <div className=' z-20 w-[227px] md:w-[518px] lg:w-[800px]'>
          <Search />
        </div>
        <FaCartShopping className=' text-white lg:text-color-3 -scale-x-[1] text-[26px]' />
        <FaUser className=' text-white text-[26px]' />
      </div>
    </div>
  )
}

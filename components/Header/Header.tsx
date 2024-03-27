'use client'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/vector/logo.svg'
import LogoBlue from '@/public/vector/LogoBlue.svg'
import SearchImg from '@/public/images/gg_search.png'
import XSearchImg from '@/public/images/x_gg_search.png'
import CartExample from '@/public/images/cardExample.png'
import AvatarExample from '@/public/images/avatarExample.png'
import Search from '@/components/Search/Search'
import { signOut } from '@/actions/auth'
import UserContext, { User } from '@/context/userContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState, useTransition } from 'react'
import { useFormState } from 'react-dom'
import {
  FaBars,
  FaCartShopping,
  FaUser,
  FaMagnifyingGlass,
  FaFacebook,
  FaInstagram
} from 'react-icons/fa6'
import DropDownMenu from '../DropdownMenu/DropdownMenu'
import { apiHelper, pathHelper } from '@/helper/router'
import Dropdown from '../Dropdown/Dropdown'
import { useMutation } from '@tanstack/react-query'
import { X_API_KEY } from '@/constrant/system'
import { getCookie } from 'cookies-next'
import { ACCESS_TOKEN, USER_ID } from '@/constrant/cookiesName'
import { removeCookiesWhenLogout } from '@/utils/cookies.utils'

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
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isDisplayMenu, setIsDisplayMenu] = useState(false)

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

  const logOut = () => {
    axios.post(
      apiHelper.logout(),
      {},
      {
        headers: {
          'x-api-key': X_API_KEY,
          'x-client-id': getCookie(USER_ID),
          authorization: getCookie(ACCESS_TOKEN)
        }
      }
    )
    if (removeCookiesWhenLogout()) {
      setUser(undefined)
      setIsDisplayMenu(false)
    }
  }

  const data = [
    'Laptops',
    'Desktop PCs',
    'Networking Devices',
    'Printers & Scanners  ',
    'PC Parts',
    'All Other Products',
    'Repairs'
  ]

  const menuOnPc = () => {
    return (
      <>
        {data.map((item) => (
          <Link
            key={item}
            href={pathHelper.product(item)}
            className='hidden lg:block text-black font-normal'
          >
            {item}
          </Link>
        ))}
      </>
    )
  }

  const handleOpenCloseMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <div className=' relative flex-col h-[104px] w-full bg-color-3 lg:bg-white lg:border-[1px] lg:border-black '>
      <div className='flex items-center justify-end gap-2 lg:justify-around md:gap-10 h-[40px] w-full bg-black relative'>
        <div className='flex justify-center items-start z-10 w-[64px] h-[60px] absolute bottom-[-30px] left-3 bg-color-3 rounded-full lg:hidden'>
          <Link href={pathHelper.home()}>
            <Image
              src={Logo}
              alt='logo'
              height={20}
              className=' text-white mt-[10px]'
            />
          </Link>
        </div>
        <div className='flex gap-2'>
          <p className=' text-[80%] text-[#A2A6B0]'>Mon-Thu:</p>
          <p className=' text-[80%] text-white'>9:00 AM - 5:30 PM</p>
        </div>
        <div className='flex gap-1 items-center'>
          <p className='hidden lg:block text-[#A2A6B0] text-[80%]'>
            Visit our showroom in 1234 Street Adress City Address, 1234
          </p>
          <p className=' text-[80%] text-white mr-5'>Contact Us</p>
        </div>
        <div className=' hidden lg:flex items-center gap-2'>
          <p className=' text-white text-[80%]'>Call Us: (00) 1234 5678</p>
          <FaFacebook className=' text-white' />
          <FaInstagram className=' text-white' />
        </div>
      </div>
      <div className=' relative flex justify-around items-center h-[64px]'>
        <Link href={pathHelper.home()}>
          <Image
            src={LogoBlue}
            alt='logo'
            height={55}
            className=' hidden lg:block'
          />
        </Link>

        {menuOnPc()}

        <FaBars
          className='text-white z-50 text-[1.5rem] lg:hidden'
          onClick={handleOpenCloseMenu}
        />
        {isOpenMenu && (
          <DropDownMenu
            items={data}
            actions={data.map((item) => () => {
              router.push(pathHelper.product(item))
            })}
            customeStyles={''}
          />
        )}

        <div className=' z-20 w-[15rem] sm:w-[30rem] lg:hidden'>
          <Search />
        </div>
        <div className=' flex w-fit gap-2 md:w-[9.5rem] md:justify-around items-center'>
          <FaMagnifyingGlass className='hidden text-black text-[19px] lg:block' />
          {user ? (
            <>
              <FaCartShopping className=' text-white lg:text-black -scale-x-[1] text-[1.25rem]' />

              <FaUser
                className=' text-white text-[1.5rem] lg:text-black'
                onClick={() => {
                  setIsDisplayMenu(true)
                }}
                onMouseEnter={() => {
                  setIsDisplayMenu(true)
                }}
              />
            </>
          ) : (
            <>
              <Link
                href={pathHelper.signin()}
                className=' md:text-[0.8rem] text-[0.6rem] md:text-color-3 text-white'
              >
                Sign-in
              </Link>
              <Link
                href={pathHelper.signup()}
                className=' md:text-[0.8rem] text-[0.6rem] md:text-color-3 text-white'
              >
                Sign-up
              </Link>
            </>
          )}
        </div>
      </div>
      <Dropdown display={isDisplayMenu} setDisplay={setIsDisplayMenu}>
        <button onClick={logOut}>Logout</button>
      </Dropdown>
    </div>
  )
}

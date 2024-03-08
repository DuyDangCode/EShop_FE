'use client'
import { pathHelper } from '@/helper/router'
import Link from 'next/link'

export default function SignIn() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <form className=' flex flex-col w-[20rem] h-[30rem] gap-2 justify-center'>
        <label htmlFor='username' className=' font-bold text-[2rem]'>
          Username
        </label>
        <input
          type='text'
          name='username'
          id='username'
          required
          className=' h-10 rounded-sm p-2'
        />
        <label htmlFor='password' className='font-bold  text-[2rem] mt-5'>
          Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          required
          className=' h-10 rounded-sm p-2'
        />

        <button
          type='submit'
          className=' mt-7 border-black border-2 h-10 rounded-md'
        >
          Signin
        </button>
        <Link href={pathHelper.signup()} className=' text-black'>
          {"Don't have an account?"}
        </Link>
      </form>
    </div>
  )
}

'use client'
import { BASE_URL_DEV, X_API_KEY } from '@/constrant/system'
import UserContext from '@/context/userContext'
import { apiHelper, pathHelper } from '@/helper/router'
import { saveCookies } from '@/utils/cookies.utils'
import { promiseToast } from '@/utils/promiseToast.utils'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'

export default function SignIn() {
  const [username, setUsername] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const [isPending, setIsPending] = useState<boolean>(false)
  const router = useRouter()
  const { user, setUser } = useContext(UserContext)
  const [messageError, setMessageError] = useState<string>('')
  const loginMutate = useMutation({
    mutationFn: async () => {
      const loginPromise = axios.post(
        apiHelper.signInPRO(),
        {
          username: username,
          password: password
        },
        {
          headers: {
            'x-api-key': X_API_KEY
          }
        }
      )
      promiseToast(
        loginPromise,
        'Signin successful',
        'Signin failed',
        'Loading...'
      )
      return await loginPromise
        .then((res) => res.data)
        .catch((err) => {
          setIsPending(false)
          setMessageError(err.response.data.message || 'Something went wrong')
          throw err
        })
    },
    gcTime: 0,
    onSuccess(data, variables, context) {
      if (
        saveCookies(
          data.metadata.accessToken,
          data.metadata.refreshToken,
          data.metadata.roles,
          data.metadata.userId
        )
      ) {
        try {
          setUser(data.metadata.userId)
          router.replace(pathHelper.home())
        } catch (error) {
          //remove cookies and notify
          setIsPending(false)
        }
      }
    }
  })

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className=' flex flex-col w-[20rem] h-[30rem] gap-2 justify-center'>
        <label htmlFor='username' className=' font-bold text-[2rem]'>
          Username
        </label>
        <input
          type='text'
          name='username'
          id='username'
          disabled={isPending}
          placeholder='enter your username...'
          value={username}
          onChange={(e) => {
            setUsername(e.currentTarget.value)
            setMessageError('')
          }}
          required
          className=' h-10 rounded-sm p-2 border-b-2 border-black'
        />
        <label htmlFor='password' className='font-bold  text-[2rem] mt-5'>
          Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          disabled={isPending}
          placeholder='enter your password...'
          value={password}
          onChange={(e) => {
            setpassword(e.currentTarget.value)
            setMessageError('')
          }}
          required
          className=' h-10 rounded-sm p-2 border-b-2 border-black'
        />
        <div className='mt-7 w-full'>
          <p className=' text-red-600 w-full h-fit'>{messageError}</p>
          <button
            className=' w-full border-black border-2 h-10 rounded-md'
            onClick={async () => {
              setIsPending(true)
              loginMutate.mutate()
            }}
          >
            Signin
          </button>
        </div>
        <Link href={pathHelper.signup()} className=' text-black'>
          {"Don't have an account?"}
          <span className=' text-color-3 ml-5'>Sign up </span>
        </Link>
      </div>
    </div>
  )
}

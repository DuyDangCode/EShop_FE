'use client'
import { BASE_URL_DEV, X_API_KEY } from '@/constrant/system'
import UserContext from '@/context/userContext'
import { apiHelper, pathHelper } from '@/helper/router'
import { saveCookies } from '@/utils/cookies.utils'
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
  const loginMutate = useMutation({
    mutationFn: async () => {
      return await axios
        .post(
          apiHelper.signIn(),
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
        .then((res) => res.data)
        .catch((err) => {
          console.log(err)
          setIsPending(false)
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
          toast.success('Signin successful')
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
          }}
          required
          className=' h-10 rounded-sm p-2 border-b-2 border-black'
        />

        <button
          className=' mt-7 border-black border-2 h-10 rounded-md'
          onClick={async () => {
            setIsPending(true)
            await loginMutate.mutate()
          }}
        >
          Signin
        </button>
        <Link href={pathHelper.signup()} className=' text-black'>
          {"Don't have an account?"}
          <span className=' text-color-3 ml-5'>Sign up </span>
        </Link>
      </div>
    </div>
  )
}

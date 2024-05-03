'use client'
import { BASE_URL_DEV, X_API_KEY } from '@/constrant/system'
import UserContext from '@/context/userContext'
import { apiHelper, pathHelper } from '@/helper/router'
import { saveCookies } from '@/utils/cookies.utils'
import {
  CheckFormatResultInterface,
  checkFormatEmail,
  checkFormatPassword,
  checkFormatUsername
} from '@/utils/validate.utils'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'

const Default_Result: CheckFormatResultInterface = { result: true, mesage: '' }

export default function SignUp() {
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPending, setIsPending] = useState<boolean>(false)
  const router = useRouter()
  const { user, setUser } = useContext(UserContext)
  const [errMsgPassword, setErrMsgPassword] = useState<Array<boolean>>([
    false,
    false,
    false,
    false
  ])
  const [showErrPassword, setShowErrPassword] = useState<boolean>(false)

  const [errMsgName, setErrMsgName] =
    useState<CheckFormatResultInterface>(Default_Result)

  const [errMsgEmail, setErrMsgEmail] =
    useState<CheckFormatResultInterface>(Default_Result)

  const [errMsgConfirm, setErrConfirm] =
    useState<CheckFormatResultInterface>(Default_Result)

  const signUpMutate = useMutation({
    mutationFn: async () => {
      return await axios
        .post(
          apiHelper.signUpPRO(),
          {
            username: name,
            email: email,
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
          toast.success('Signin successful')
          router.replace(pathHelper.home())
        } catch (error) {
          //remove cookies and notify
          setIsPending(false)
        }
      }
    },
    onError(err: any) {
      console.log(err?.response.data.message)
      setIsPending(false)
      toast.error(err?.response.data.message)
    }
  })

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className=' flex md:flex-row flex-col w-fit min-h-min gap-10 justify-center items-start'>
        <div className='flex flex-col w-96 gap-5'>
          <div className=' flex flex-col gap-2'>
            <label htmlFor='Name' className=' font-bold text-[2rem]'>
              Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              disabled={isPending}
              placeholder='enter your name...'
              value={name}
              onChange={(e) => {
                if (!errMsgName.result) {
                  setErrMsgName(Default_Result)
                }
                setName(e.currentTarget.value)
              }}
              required
              className=' h-10 rounded-sm p-2 border-b-2 border-black'
            />

            <p className=' text-red-600 h-[1rem]'>{errMsgName.mesage}</p>
          </div>
          <div className='flex flex-col gap-2'>
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
                const text = e.currentTarget.value
                if (text.length) {
                  setShowErrPassword(true)
                  setErrMsgPassword([
                    checkFormatPassword.checkLength(text).result !==
                    errMsgPassword[0]
                      ? !errMsgPassword[0]
                      : errMsgPassword[0],
                    checkFormatPassword.checkText(text).result !==
                    errMsgPassword[1]
                      ? !errMsgPassword[1]
                      : errMsgPassword[1],
                    checkFormatPassword.checkNumber(text).result !==
                    errMsgPassword[2]
                      ? !errMsgPassword[2]
                      : errMsgPassword[2],
                    checkFormatPassword.checkSpecial(text).result !==
                    errMsgPassword[3]
                      ? !errMsgPassword[3]
                      : errMsgPassword[3]
                  ])
                } else {
                  setShowErrPassword(false)
                }
                setPassword(text)
              }}
              required
              className=' h-10 rounded-sm p-2 border-b-2 border-black'
            />
            {showErrPassword && (
              <div className=' gap-2 font-thin'>
                <p
                  className={
                    errMsgPassword[0] ? 'text-green-500' : 'text-red-600'
                  }
                >
                  8 characters
                </p>
                <p
                  className={
                    errMsgPassword[1] ? 'text-green-500' : 'text-red-600'
                  }
                >
                  alphabetic character
                </p>
                <p
                  className={
                    errMsgPassword[2] ? 'text-green-500' : 'text-red-600'
                  }
                >
                  numeric character
                </p>
                <p
                  className={
                    errMsgPassword[3] ? 'text-green-500' : 'text-red-600'
                  }
                >
                  special character
                </p>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col w-96 gap-5'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='email' className=' font-bold text-[2rem]'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              disabled={isPending}
              placeholder='example.@gmail.com'
              value={email}
              onChange={(e) => {
                if (!errMsgEmail.result) {
                  setErrMsgEmail(Default_Result)
                }
                setEmail(e.currentTarget.value)
              }}
              required
              className=' h-10 rounded-sm p-2 border-b-2 border-black'
            />
            <p className=' text-red-600 h-[1rem]'>{errMsgEmail.mesage}</p>
          </div>

          <div className='flex flex-col w-96 gap-5'>
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='confirmPassword'
                className='font-bold  text-[2rem] mt-5'
              >
                Confirm Password
              </label>
              <input
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                disabled={isPending}
                placeholder='enter your password...'
                value={confirmPassword}
                onChange={(e) => {
                  if (!errMsgConfirm.result) {
                    setErrConfirm(Default_Result)
                  }
                  setConfirmPassword(e.currentTarget.value)
                }}
                required
                className=' h-10 rounded-sm p-2 border-b-2 border-black'
              />
              <p className=' text-red-600 h-[1rem]'>{errMsgConfirm.mesage}</p>
            </div>

            <div className='flex flex-col gap-2'>
              <button
                className=' mt-7 border-black border-2 h-10 rounded-md'
                onClick={async () => {
                  setIsPending(true)
                  const resultCheckName: CheckFormatResultInterface =
                    checkFormatUsername(name)
                  const resultCheckEmail: CheckFormatResultInterface =
                    checkFormatEmail(email)
                  const resultCheckConfirm: CheckFormatResultInterface = {
                    result: confirmPassword === password,
                    mesage: 'Does not match the entered password'
                  }

                  if (!resultCheckName.result) {
                    setErrMsgName(resultCheckName)
                    setIsPending(false)
                  } else if (!resultCheckEmail.result) {
                    setErrMsgEmail(resultCheckEmail)
                    setIsPending(false)
                  } else if (!password.length) {
                    setIsPending(false)
                    setShowErrPassword(true)
                  } else if (!resultCheckConfirm.result) {
                    setErrConfirm(resultCheckConfirm)
                    setIsPending(false)
                  } else {
                    await signUpMutate.mutateAsync()
                  }
                }}
              >
                Signin
              </button>
              <Link href={pathHelper.signup()} className=' text-black'>
                {'Have an account?'}
                <span className=' text-color-3 ml-5'>Sign in now </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

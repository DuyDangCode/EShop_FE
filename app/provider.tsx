'use client'

import UserContext, { User } from '@/context/userContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { queryClient } from './queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function Provider({
  children,
  defaultUser
}: {
  children: ReactNode
  defaultUser: User
}) {
  const [user, setUser] = useState(defaultUser)
  useEffect(() => {
    setUser(defaultUser)
  }, [defaultUser])
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
        <ReactQueryDevtools initialIsOpen={true} />
        <Toaster position='bottom-center' reverseOrder={false} />
      </UserContext.Provider>
    </QueryClientProvider>
  )
}

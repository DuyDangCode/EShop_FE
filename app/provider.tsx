'use client'

import UserContext, { User } from '@/context/userContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { queryClient } from './queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios'
import { X_API_KEY } from '@/constrant/system'
import { getCookie } from 'cookies-next'
import { MantineProvider } from '@mantine/core'

export function Provider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | undefined>(undefined)
  useEffect(() => {
    const userId = getCookie('userId')
    setUser(userId)
  }, [])
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ user, setUser }}>
          {children}
          <ReactQueryDevtools initialIsOpen={true} />
          <Toaster position='bottom-right' reverseOrder={false} />
        </UserContext.Provider>
      </QueryClientProvider>
    </MantineProvider>
  )
}

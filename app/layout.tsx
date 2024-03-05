import { NavBar } from '@/components/Nav'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Toaster } from 'react-hot-toast'
import { Provider } from './provider'
import { cookies } from 'next/headers'
import { ROLES, USER_ID } from '@/constrant/cookiesName'
import { User } from '@/context/userContext'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'E-Shop',
  description: 'The ecommerce shop'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // const defaultUser: User = {
  //   userId: cookies().get(USER_ID)?.value,
  //   roles: cookies().get(ROLES)?.value,
  // };
  const defaultUser: User = {
    userId: null,
    roles: null
  }
  return (
    <html lang='en'>
      <body className={`${poppins.className} text-slate-700`}>
        <div className='flex flex-col min-h-screen'>
          <Provider defaultUser={defaultUser}>
            <Header />
            <main className='flex-grow'>{children}</main>
            <Footer />
            <Toaster position='bottom-center' reverseOrder={false} />
          </Provider>
        </div>
      </body>
    </html>
  )
}

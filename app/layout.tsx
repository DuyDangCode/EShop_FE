import { NavBar } from '@/components/Nav'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
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
  return (
    <html lang='en'>
      <body className={`${poppins.className} text-slate-700`}>
        <div className='flex flex-col min-h-screen'>
          <Provider>
            <Header />
            <main className=' min-h-screen max-w-full py-8 lg:px-10 md:px-5 sm:px-2'>
              {children}
            </main>
            <Footer />
          </Provider>
        </div>
      </body>
    </html>
  )
}

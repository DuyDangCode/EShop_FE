import { pathHelper } from '@/helper/router'
import Link from 'next/link'

export default function page() {
  return (
    <div className=' flex w-full flex-col h-44 mt-20  justify-normal items-center'>
      <h1 className=' text-black text-[2rem] md:text-[3.5rem]'>
        404 - Not Found{' '}
      </h1>
      <Link href={pathHelper.home()}>Back to home</Link>
    </div>
  )
}

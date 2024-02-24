import Image from 'next/image'
import SearchImg from '@/public/images/gg_search.png'
import { searchAction } from '@/actions/search'

export default function Search() {
  return (
    <form
      action={searchAction}
      className=' w-full h-[38px] flex items-center bg-color-1 rounded-[31px] my-2 '
    >
      <input
        className=' text-[11px] flex-[15] bg-transparent p-[3px] outline-none rounded-l-[31px]'
        placeholder='Search entiere store here...'
        maxLength={200}
        id='keyword'
        name='keyword'
      />

      <button
        type='submit'
        className=' flex-[3] lg:flex-[1] h-full flex justify-center md:justify-end items-center rounded-r-[31px]'
      >
        <Image
          src={SearchImg}
          alt='Search button'
          className='w-auto h-[20px] cursor-pointer pr-[8px]'
        />
      </button>
    </form>
  )
}

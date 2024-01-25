import Image from 'next/image';
import SearchImg from '@/public/images/gg_search.png';
import { searchAction } from '@/actions/search';

export default function Search() {
  return (
    <form
      action={searchAction}
      className=' flex-[8] flex items-center bg-color-1 rounded-[31px] my-2 '
    >
      <input
        className=' flex-[15] bg-transparent p-4 outline-none rounded-l-[31px]'
        placeholder='Search entiere store here...'
        maxLength={200}
        id='keyword'
        name='keyword'
      />
      <div className=' flex-[1] h-full flex justify-end items-center pr-[20px] rounded-r-[31px]'>
        <button type='submit'>
          <Image
            src={SearchImg}
            alt='Search button'
            className='w-auto h-[30px] cursor-pointer '
          />
        </button>
      </div>
    </form>
  );
}

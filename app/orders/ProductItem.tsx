import Image from 'next/image'
import Monior_Example from '@/public/vector/monitor_example.svg'
import { formatMoney } from '@/utils/string.utils'

interface ProductItemProps {}
export default function ProductItem() {
  return (
    <div className='w-full flex h-[50px] items-center justify-center'>
      <div className='flex-1 justify-center flex items-center h-[50px] '>
        <Image
          alt='product'
          src={Monior_Example}
          width='0'
          height='0'
          sizes='100vh'
          className='w-auto h-full'
        />
      </div>
      <div className='flex-[5] flex flex-col h-[50px]'>
        <p>{'Product name'}</p>
        <p>x{1}</p>
      </div>
      <div className='flex-[1] flex items-center justify-center h-[50px]'>
        {formatMoney(100)}
      </div>
    </div>
  )
}

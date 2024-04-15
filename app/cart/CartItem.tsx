import Image from 'next/image'
import { FaTrash } from 'react-icons/fa6'
import Monior_Example from '@/public/vector/monitor_example.svg'
import { Checkbox } from '@mantine/core'
import { colors } from '@/constrant/colors'
import { formatAmount, formatMoney } from '@/utils/string.utils'

export default function CartItem() {
  return (
    <div className='grid items-center h-10 grid-cols-14 grid-flow-col grid-rows-1 w-full'>
      <div className=' ml-2 md:ml-5 '>
        <Checkbox color={colors.blackColor} />
      </div>
      <div className=' col-span-6 mx-2 items-center justify-center w-full  h-full flex flex-row'>
        <Image
          src={Monior_Example}
          alt='product image'
          className=' h-full w-auto '
        />
        <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
          Product Name ProductNameProduct Name Product Name
        </p>
      </div>
      <p className=' col-span-2 text-ellipsis flex justify-center whitespace-nowrap overflow-hidden'>
        {formatMoney(0)}
      </p>
      <div className='flex justify-center col-span-2 mx-1'>
        <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
          {formatAmount(0)}
        </p>
      </div>
      <div className='flex justify-center col-span-2  mx-1'>
        <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
          {formatMoney(0)}
        </p>
      </div>
      <FaTrash />
    </div>
  )
}

'use client'
import { FaTrash } from 'react-icons/fa6'
import CartItem from './CartItem'
import { CheckIcon, Checkbox } from '@mantine/core'
import { colors } from '@/constrant/colors'
import { formatMoney } from '@/utils/string.utils'

export default function CartPage() {
  return (
    <div className='flex flex-col w-full h-full gap-5'>
      <div className=' text-[2rem] font-bold'>Cart</div>
      <div className=' flex md:flex-row flex-col h-fit w-full gap-5 '>
        <div className=' flex flex-col bg-slate-50 h-full md:w-[70%] w-full border-[0.5px] border-black'>
          <div className=' mt-2 grid items-center grid-cols-14 grid-flow-col grid-rows-1 font-bold'>
            <div className=' ml-2 md:ml-5'>
              <Checkbox color={colors.blackColor} />
            </div>
            <p className=' flex justify-center col-span-6 text-ellipsis whitespace-nowrap overflow-hidden mx-1'>
              Product
            </p>
            <p className='flex justify-center text-ellipsis col-span-2 whitespace-nowrap overflow-hidden mx-1'>
              Price
            </p>
            <div className='flex justify-center col-span-2 mx-1'>
              <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
                Quantity
              </p>
            </div>
            <div className='flex justify-center col-span-2  mx-1'>
              <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
                Cost
              </p>
            </div>
            <FaTrash />
          </div>
          <CartItem />
        </div>

        <div className='flex flex-col bg-slate-50 h-full md:w-[30%] p-5 w-full border-[0.5px] border-black'>
          <p className='w-full h-fit text-[1.5rem]'>Tam tinh</p>
          <div className='w-full h-fit flex flex-col items-end '>
            <p className=' font-bold text-[1.5rem]'>{formatMoney(0)}</p>
            <p className=' font-thin text-sm'>chua tinh phi van chuyen</p>
          </div>
          <button className='w-full  bg-black text-white rounded-md px-3 h-10'>
            Order
          </button>
        </div>
      </div>
    </div>
  )
}

'use client'
import Image from 'next/image'
import { FaTrash } from 'react-icons/fa6'
import Monior_Example from '@/public/vector/monitor_example.svg'
import { Checkbox } from '@mantine/core'
import { colors } from '@/constrant/colors'
import { formatAmount, formatMoney } from '@/utils/string.utils'
import { useEffect, useState } from 'react'

interface CartItemProps {
  checkedAll: boolean
  image: string
  name: string
  price: number
  quantity: number
  setCheckedAll: Function
  setProductNotChecked: Function
  setTotalCost: Function
}

export default function CartItem({
  checkedAll,
  image,
  name,
  price,
  quantity,
  setCheckedAll,
  setProductNotChecked,
  setTotalCost
}: CartItemProps) {
  const [checked, setChecked] = useState<boolean>(checkedAll)
  useEffect(() => {
    if (checkedAll) {
      if (!checked) {
        setChecked(true)
      }
    } else if (checked) {
      setChecked(false)
    }
  }, [checkedAll])

  return (
    <div className='grid items-center h-10 grid-cols-14 grid-flow-col grid-rows-1 w-full'>
      <div className=' ml-2 md:ml-5 '>
        <Checkbox
          color={colors.blackColor}
          checked={checked}
          onClick={() => {
            if (checked) {
              setChecked(false)
              if (checkedAll) {
                setCheckedAll(false)
                setTotalCost(0)
              } else {
                setProductNotChecked((prev: number) => prev + 1)
                setTotalCost((prev: number) => prev - price * quantity)
              }
            } else {
              setChecked(true)
              setProductNotChecked((prev: number) => prev - 1)
              setTotalCost((prev: number) => prev + price * quantity)
            }
          }}
        />
      </div>
      <div className=' col-span-6 mx-2 items-center justify-center w-full  h-full flex flex-row'>
        <Image
          src={Monior_Example}
          alt='product image'
          className=' h-full w-auto '
        />
        <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
          {name}
        </p>
      </div>
      <p className=' col-span-2 text-ellipsis flex justify-center whitespace-nowrap overflow-hidden'>
        {formatMoney(price)}
      </p>
      <div className='flex justify-center col-span-2 mx-1'>
        <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
          {formatAmount(quantity)}
        </p>
      </div>
      <div className='flex justify-center col-span-2  mx-1'>
        <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
          {formatMoney(price * quantity)}
        </p>
      </div>
      <FaTrash />
    </div>
  )
}

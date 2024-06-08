'use client'
import Image from 'next/image'
import { FaTrash } from 'react-icons/fa6'
import Monior_Example from '@/public/vector/monitor_example.svg'
import {
  ActionIcon,
  Checkbox,
  Input,
  NumberInput,
  NumberInputHandlers,
} from '@mantine/core'
import { colors } from '@/constrant/colors'
import { formatAmount, formatMoney } from '@/utils/string.utils'
import { useEffect, useRef, useState } from 'react'
import { IconPlus, IconMinus } from '@tabler/icons-react'
import { promiseToast } from '@/utils/promiseToast.utils'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import apiInstance from '@/axiosInstance'
import { apiHelper } from '@/helper/router'
import { queryClient } from '../queryClient'

interface CartItemProps {
  productId: string
  checkedAll: boolean
  image: string
  name: string
  price: number
  quantity: number
  setCheckedAll: Function
  setProductNotChecked: Function
  setTotalCost: Function
  setCartData: Function
}

export default function CartItem({
  productId,
  checkedAll,
  image,
  name,
  price,
  quantity,
  setCheckedAll,
  setProductNotChecked,
  setTotalCost,
  setCartData,
}: CartItemProps) {
  const [checked, setChecked] = useState<boolean>(checkedAll)
  const [newQuantity, setNewQuantity] = useState<number>(quantity)
  function debounce(callback: Function, timer: number = 300) {
    let timeout: any
    return function (...args: any) {
      clearTimeout(timeout)
      timeout = setTimeout(() => callback.apply(null, args), timer)
    }
  }
  const updateCart = debounce(
    (productId: string, oldQuantity: number, newQuantity: number) => {
      const updatePromise = apiInstance.patch(apiHelper.cart(), {
        product: {
          productId: productId,
          newQuantity: newQuantity,
          oldQuantity: oldQuantity,
        },
      })

      promiseToast(updatePromise, 'Update sucessful', 'Fail')
    },
  )

  const removeProduct = async (productId: string) => {
    setCartData((prev: any) => {
      const newValue: Array<any> = []
      prev.forEach((item: any) => {
        if (item.productId !== productId) newValue.push(item)
      })
      return newValue
    })
    const removePromise = apiInstance.delete(apiHelper.cartProduct(productId))
    promiseToast(removePromise, 'Remove sucessful', 'Fail')
  }

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
    <div className='grid items-center h-10 grid-cols-14 grid-flow-col grid-rows-1 w-full my-1'>
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
                setTotalCost((prev: number) => prev - price * newQuantity)
              }
            } else {
              setChecked(true)
              setProductNotChecked((prev: number) => prev - 1)
              setTotalCost((prev: number) => prev + price * newQuantity)
            }
          }}
        />
      </div>
      <div className=' col-span-5 mx-2 items-center justify-start w-full gap-3  h-full flex flex-row'>
        <Image
          src={image}
          alt='product image'
          width={0}
          height={0}
          sizes='100vh'
          className=' h-full w-auto '
        />
        <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
          {name}
        </p>
      </div>
      <p className=' col-span-2 text-ellipsis hidden md:flex justify-center whitespace-nowrap overflow-hidden'>
        {formatMoney(price)}
      </p>
      <div className='flex justify-evenly items-center col-span-3 mx-1'>
        {/* <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
          {formatAmount(quantity)}
        </p> */}
        <NumberInput
          mx={10}
          min={1}
          max={1000000}
          clampBehavior='strict'
          allowNegative={false}
          allowDecimal={false}
          thousandSeparator=' '
          stepHoldDelay={500}
          stepHoldInterval={100}
          value={newQuantity}
          onChange={(v: any) => {
            if (!isNaN(parseInt(v))) {
              if (checked || checkedAll)
                setTotalCost((prev: number) => {
                  return prev + price * (v - newQuantity)
                })
              setNewQuantity(v)

              updateCart(productId, newQuantity, v)
            }
          }}
        />
      </div>
      <div className='flex justify-center md:col-span-2 col-span-4  mx-1'>
        <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
          {formatMoney(price * newQuantity)}
        </p>
      </div>
      <ActionIcon
        onClick={() => {
          removeProduct(productId)
        }}
        variant='transparent'
        color='black'
      >
        <FaTrash />
      </ActionIcon>
    </div>
  )
}

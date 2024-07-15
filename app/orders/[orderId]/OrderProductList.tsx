'use client'
import { formatMoney } from '@/utils/string.utils'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

interface ProductRequest {
  voucherId?: string
  productId: string
  product_quantity: number
  product_price: number
}
export default function OrderProductList() {
  const {
    data: productData,
    isPending: isPendingProduct,
    isError: isErrorCheckOutProduct,
  } = useQuery({
    queryKey: ['productCheckout'],
    queryFn: () => {
      return null
    },
    staleTime: Infinity,
    gcTime: 0,
  })

  function showProductsList(
    productData: Map<string, Object> | null | undefined,
  ) {
    const result: Array<any> = []
    productData?.forEach((value: any, key) => {
      result.push(
        <div key={key} className='grid grid-cols-7 grid-rows-1 w-full gap-3'>
          <div className=' col-span-3 text-ellipsis whitespace-nowrap overflow-hidden h-fit '>
            {value.product_name}
          </div>
          <div className=' col-span-1 hidden text-ellipsis whitespace-nowrap overflow-hidden md:flex items-center justify-center h-fit'>
            {value.product_price}
          </div>
          <div className=' col-span-1 text-ellipsis whitespace-nowrap overflow-hidden flex items-center justify-center h-fit'>
            {value.product_quantity}
          </div>
          <div className=' col-span-1 text-ellipsis whitespace-nowrap overflow-hidden flex items-center justify-center h-fit'>
            Discount
          </div>
          <div className=' md:col-span-1 col-span-2 text-ellipsis whitespace-nowrap overflow-hidden flex items-center justify-center h-fit'>
            {formatMoney(value.product_price * value.product_quantity)}
          </div>
        </div>,
      )
    })
    return result
  }

  return (
    <div className='flex w-full h-fit p-5'>
      <div className='w-full  border-[1px] border-black'>
        <div className='grid grid-cols-7 grid-rows-1 w-full '>
          <div className=' col-span-3 flex items-center justify-center'>
            Product
          </div>
          <div className=' col-span-1 md:flex hidden items-center justify-center'>
            Price
          </div>
          <div className=' col-span-1 md:flex hidden items-center justify-center'>
            Quantity
          </div>
          <div className=' col-span-1 flex md:hidden items-center justify-center'>
            Q
          </div>
          <div className=' col-span-1 flex items-center justify-center'>
            Discount
          </div>
          <div className=' md:col-span-1 col-span-2  flex items-center justify-center'>
            Cost
          </div>
        </div>
        {showProductsList(productData)}
      </div>
    </div>
  )
}

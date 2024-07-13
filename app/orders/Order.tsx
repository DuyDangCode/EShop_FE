'use client'
import { Divider } from '@mantine/core'
import ProductItem from './ProductItem'
import { useContext, useEffect, useState } from 'react'
import { formatMoney } from '@/utils/string.utils'
import { useRouter } from 'next/navigation'
import { pathHelper } from '@/helper/router'

interface OrderProductRes {
  productId: string
  product_quantity: number
  product_price: number
}
interface OrderProp {
  products: Array<OrderProductRes>
  orderId: string
}

export default function Order({ products, orderId }: OrderProp) {
  const [total, setTotal] = useState(0)
  const router = useRouter()
  useEffect(() => {
    let totalPrice = 0
    products.map((currentProduct: OrderProductRes) => {
      totalPrice +=
        currentProduct.product_quantity * currentProduct.product_price
    })
    setTotal(totalPrice)
  }, [])

  return (
    <div
      className='flex flex-col p-3 w-full h-fit border-[1px] border-black rounded-md cursor-pointer'
      onDoubleClick={() => {
        router.push(pathHelper.orderDetail(orderId))
      }}
    >
      <div className=' w-full h-5'>Order: {orderId}</div>
      <Divider my='md' />
      <div className='flex flex-col w-full h-fit gap-2'>
        {products?.map((productItem: OrderProductRes) => {
          return (
            <ProductItem
              key={productItem.productId}
              productId={productItem.productId}
              product_quantity={productItem.product_quantity}
              product_price={productItem.product_price}
            />
          )
        })}
      </div>
      <Divider my='md' />
      <div className='flex justify-end items-center w-full'>
        Total cost: {formatMoney(total)}
      </div>
    </div>
  )
}

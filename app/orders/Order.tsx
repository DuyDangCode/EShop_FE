'use client'
import { Divider } from '@mantine/core'
import ProductItem from './ProductItem'

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
  return (
    <div className='flex flex-col p-3 w-full h-fit border-[1px] border-black rounded-md'>
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
        Total cost: {339999}
      </div>
    </div>
  )
}

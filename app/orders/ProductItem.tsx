'use client'
import Image from 'next/image'
import Monior_Example from '@/public/vector/monitor_example.svg'
import { formatMoney } from '@/utils/string.utils'
import { useQuery } from '@tanstack/react-query'

interface ProductItemProps {
  productId: string
  product_quantity: number
  product_price: number
}

export default function ProductItem({
  product_quantity,
  productId,
  product_price,
}: ProductItemProps) {
  const {} = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {},
  })
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
        <p>x{product_quantity}</p>
      </div>
      <div className='flex-[1] flex items-center justify-center h-[50px]'>
        {formatMoney(product_quantity * product_price)}
      </div>
    </div>
  )
}

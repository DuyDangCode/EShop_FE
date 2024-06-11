'use client'
import { formatMoney } from '@/utils/string.utils'
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  LoadingOverlay,
  Radio,
} from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { queryClient } from '../queryClient'
import { useRouter } from 'next/navigation'

const Data_Example = [
  {
    id: 1,
    name: 'Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1Product 1',
    price: 100,
    quantity: 1,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
    quantity: 2,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 300,
    quantity: 3,
    image: 'https://via.placeholder.com/150',
  },
]

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<string>('online')
  const router = useRouter()
  const { data: productData, isPending } = useQuery({
    queryKey: ['productCheckout'],
    queryFn: () => {
      const queryData: Map<string, Object> | null | undefined =
        queryClient.getQueryData(['productCheckout'])
      if (!queryData || queryData?.size === 0) {
        router.back()
      }
      return queryData
    },
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
    <div className='flex md:flex-row flex-col w-full h-full my-4 gap-10 items-start'>
      <div className='flex flex-[3] flex-col gap-5 h-fit '>
        <div className='flex flex-col border-[1px] border-black p-5'>
          <div className='flex items-center gap-2 font-bold text-black text-[1.5rem]'>
            <IconInfoCircle size={24} />
            <p>Checkout information</p>
          </div>
          <div className=' flex gap-5 w-fit max-w-full flex-row'>
            <p>User:</p>
            <p>DuyDangCode</p>
          </div>
          <div className=' flex gap-5 w-fit max-w-full flex-row'>
            <p>Phone:</p>
            <p>0920292393xxx</p>
          </div>
          <div className=' flex gap-5 w-fit max-w-full flex-row'>
            <p>Address:</p>
            <p>HCM city</p>
          </div>
        </div>

        <div className='flex flex-row gap-3 p-5 border-[1px] border-black'>
          <p>Expected delivery:</p>
          <p>{'20/5/2024'}</p>
        </div>

        <div className='w-full -h-full p-5  border-[1px] border-black'>
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

        <div className=' border-[1px] border-black p-5'>
          <p>Payment method:</p>
          <Radio.Group value={paymentMethod} onChange={setPaymentMethod}>
            <Flex gap={20}>
              <Radio label='Online' value={'online'} />
              <Radio label='Upon receipt' value={'upon receipt'} />
            </Flex>
          </Radio.Group>
        </div>
      </div>
      <div className='flex flex-[1] border-[1px] border-black h-fit flex-col items-end p-5'>
        <p className=' gap-3 flex'>
          <span className='font-bold text-[1.2rem]'>1</span>
          {`${productData?.size == 1 ? 'product' : 'products'}`}
        </p>
        <div className='w-full'>
          <div className=' flex w-full justify-start items-center gap-3 '>
            <p>Ships: </p>
            <p>{formatMoney(100000)}</p>
          </div>
          <div className=' flex w-full justify-start items-center gap-3 '>
            <p>Discount: </p>
            <p>{formatMoney(100000)}</p>
          </div>
          <div className=' flex w-full justify-start items-center gap-3 '>
            <p>Total cost: </p>
            <p>{formatMoney(100000)}</p>
          </div>
          <div className=' flex gap-3 mt-5 flex-row w-full'>
            <Button color='green' className='flex-[1]'>
              Order
            </Button>
            <Button color='red' className='flex-[1]'>
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <LoadingOverlay
        visible={isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'black', type: 'bars' }}
      />
    </div>
  )
}

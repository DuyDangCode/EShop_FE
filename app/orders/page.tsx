'use client'

import NavOrderPage from './NavOrderPage'
import Order from './Order'
import { Pagination, LoadingOverlay } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import apiInstance from '@/axiosInstance'
import { apiHelper } from '@/helper/router'
import UserContext from '@/context/userContext'
import { metadata } from '../layout'
interface OrderProductRes {
  productId: string
  product_quantity: number
  product_price: number
}
interface OrderItemRes {
  _id: string
  order_product: Array<OrderProductRes>
}
export default function OrderPage() {
  const [page, setPage] = useState(1)
  const [state, setState] = useState('Pending')
  const {
    data: orderData,
    isError: getOrderError,
    isPending: isGetOrder,
  } = useQuery({
    queryKey: ['order', page],
    queryFn: async () => {
      return await apiInstance
        .get(apiHelper.order(), {
          data: {
            // "filter" = 'all',
            page: page,
            // "sort" = 'updateTime',
            // "select",
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          throw err
        })
    },
  })

  if (getOrderError) {
    return <div>Something wrong</div>
  }
  if (isGetOrder) {
    return (
      <LoadingOverlay
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'black', type: 'bars' }}
      />
    )
  }
  return (
    <div className='flex w-full gap-2 h-fit justify-center items-center flex-col'>
      <NavOrderPage state={state} setState={setState}></NavOrderPage>
      {orderData?.metadata.map((orderItem: OrderItemRes) => {
        return (
          <Order
            key={orderItem._id}
            orderId={orderItem._id}
            products={orderItem.order_product}
          />
        )
      })}

      <Pagination total={10} color='black' />
    </div>
  )
}

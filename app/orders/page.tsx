'use client'

import NavOrderPage from './NavOrderPage'
import Order from './Order'
import { Pagination, LoadingOverlay } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import apiInstance from '@/axiosInstance'
import { apiHelper } from '@/helper/router'
import UserContext from '@/context/userContext'
import { metadata } from '../layout'
import { LIMIT_ORDER } from '@/constrant/query'
import { throws } from 'assert'
interface OrderProductRes {
  productId: string
  product_quantity: number
  product_price: number
}
interface OrderItemRes {
  _id: string
  order_products: Array<OrderProductRes>
}
export default function OrderPage() {
  const [page, setPage] = useState(1)
  const [state, setState] = useState('Pending')
  const {
    data: orderData,
    isError: getOrderError,
    isPending: isGetOrder,
  } = useQuery({
    queryKey: ['order', page, state],
    queryFn: async () => {
      return await apiInstance
        .post(apiHelper.orders(), {
          // "filter" = 'all',
          filter: {
            order_status: state.toLowerCase(),
          },
          page: page,
          // "sort" = 'updateTime',
          // "select",
        })
        .then((res) => res.data)
        .catch((err) => {
          throw err
        })
    },
  })

  const {
    data: totalPage,
    isError: totalPageError,
    isPending: totalPageIsPending,
  } = useQuery({
    queryKey: ['total page', state],
    queryFn: async () => {
      return await apiInstance
        .post(apiHelper.totalOrder(), {
          filter: {
            order_status: state.toLowerCase(),
          },
        })
        .then((res: any) => {
          return Math.ceil(res.data.metadata.total / LIMIT_ORDER)
        })
        .catch((e: Error) => {
          throw e
        })
    },
  })

  return (
    <div className='flex w-full gap-2 h-fit justify-center items-center flex-col'>
      <NavOrderPage state={state} setState={setState}></NavOrderPage>
      {(getOrderError || totalPageError) && <div>Something wrong</div>}
      {orderData?.metadata.map((orderItem: OrderItemRes) => {
        return (
          <Order
            key={orderItem._id}
            orderId={orderItem._id}
            products={orderItem.order_products}
          />
        )
      })}

      <Pagination total={totalPage ?? 0} color='black' />
      <LoadingOverlay
        visible={isGetOrder || totalPageIsPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'black', type: 'bars' }}
      />
    </div>
  )
}

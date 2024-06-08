'use client'
import { FaTrash } from 'react-icons/fa6'
import CartItem from './CartItem'
import { ActionIcon, CheckIcon, Checkbox } from '@mantine/core'
import { colors } from '@/constrant/colors'
import { formatMoney } from '@/utils/string.utils'
import toast from 'react-hot-toast'
import { promiseToast } from '@/utils/promiseToast.utils'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { apiHelper } from '@/helper/router'
import { X_API_KEY } from '@/constrant/system'
import { getAuthentication, getUserId } from '@/utils/cookies.utils'
import { LoadingOverlay } from '@mantine/core'
import apiInstance from '@/axiosInstance'

export default function CartPage() {
  const [checkedAll, setCheckedAll] = useState<boolean>(false)
  const { data, isPending } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      return await apiInstance
        .get(apiHelper.cart())
        .then((res) => res.data)
        .catch((err) => {
          throw err
        })
    },
  })
  const [cartData, setCartData] = useState<Array<any>>([])
  const [productNotChecked, setProductNotChecked] = useState<number>(-1)

  const [totalCost, setTotalCost] = useState<number>(0)
  useEffect(() => {
    if (productNotChecked === 0) {
      setCheckedAll(true)
      setProductNotChecked(data?.metadata?.cart_products.length)
    }
    // console.log(productNotChecked)
  }, [productNotChecked])
  const maxCost = useRef(0)
  useEffect(() => {
    if (data?.metadata?.cart_products)
      setCartData(data?.metadata?.cart_products)
  }, [data])

  useEffect(() => {
    if (productNotChecked == -1 && cartData.length > 0)
      setProductNotChecked(cartData.length)
    for (let i = 0; i < cartData.length; i++) {
      maxCost.current += cartData[i].product_price * cartData[i].productQuantity
    }
  }, [cartData])
  const removeCart = async () => {
    setCartData([])
    const removePromise = apiInstance.delete(apiHelper.cart())
    promiseToast(removePromise, 'Remove sucessful', 'Fail')
  }

  return (
    <div className='flex flex-col w-full h-full gap-5'>
      <div className=' text-[2rem] font-bold'>Cart</div>
      <div className=' flex md:flex-row flex-col h-fit w-full gap-5 '>
        <div className=' flex flex-col bg-slate-50 h-full md:w-[70%] w-full border-[0.5px] border-black'>
          <div className='grid  my-1 items-center grid-cols-14 grid-flow-col grid-rows-1 font-bold'>
            <div className=' ml-2 md:ml-5'>
              <Checkbox
                color={colors.blackColor}
                checked={checkedAll}
                onClick={() => {
                  if (checkedAll) {
                    setCheckedAll(false)
                    if (cartData.length > 0)
                      setProductNotChecked(cartData.length)
                    setTotalCost(0)
                  } else {
                    setCheckedAll(true)
                    setProductNotChecked(0)
                    setTotalCost(maxCost.current)
                  }
                }}
              />
            </div>
            <p className=' flex justify-center col-span-5  text-ellipsis whitespace-nowrap overflow-hidden mx-1'>
              Product
            </p>
            <p className='md:flex justify-center text-ellipsis hidden col-span-2 whitespace-nowrap overflow-hidden mx-1'>
              Price
            </p>
            <div className='flex justify-center col-span-3 mx-1'>
              <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
                Quantity
              </p>
            </div>
            <div className='flex justify-center md:col-span-2 col-span-4  mx-1'>
              <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
                Cost
              </p>
            </div>
            <ActionIcon
              onClick={() => {
                removeCart()
              }}
              color='black'
              variant='transparent'
            >
              <FaTrash />
            </ActionIcon>
          </div>
          {cartData.map((item: any) => (
            <CartItem
              productId={item.productId}
              key={item.productId}
              name={item.product_name}
              quantity={item.productQuantity}
              price={item.product_price}
              image={item.product_thumb}
              checkedAll={checkedAll}
              setCheckedAll={setCheckedAll}
              setProductNotChecked={setProductNotChecked}
              setTotalCost={setTotalCost}
              setCartData={setCartData}
            />
          ))}
        </div>

        <div className='flex flex-col bg-slate-50 h-full md:w-[30%] p-5 w-full border-[0.5px] border-black'>
          <p className='w-full h-fit text-[1.5rem]'>Estimated Cost</p>
          <div className='w-full h-fit flex flex-col items-end '>
            <p className=' font-bold text-[1.5rem]'>{formatMoney(totalCost)}</p>
            <p className=' font-thin text-sm'>shipping not included</p>
          </div>
          <button
            className='w-full  bg-black text-white rounded-md px-3 h-10'
            onClick={() => {
              // toast.success('Order successfully')
              const promiseTest = new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve('Order successfully')
                }, 5000)
              })
              promiseToast(
                promiseTest,
                'Order successfully',
                'Order failed',
                'Ordering...',
                'order',
              )
            }}
          >
            Order
          </button>
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

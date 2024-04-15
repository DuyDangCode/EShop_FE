'use client'
import { FaTrash } from 'react-icons/fa6'
import CartItem from './CartItem'
import { CheckIcon, Checkbox } from '@mantine/core'
import { colors } from '@/constrant/colors'
import { formatMoney } from '@/utils/string.utils'
import toast from 'react-hot-toast'
import { promiseToast } from '@/utils/promiseToast.utils'
import { useEffect, useRef, useState } from 'react'

//luong se la nhu sau
//chinh sua so luong, hay xoa san pham deu se goi api tu server, sau do server tra ve don hang moi roi cap nhap, khong cap nhap tren client
//todo: cartservice se phai tra ve thong tin cua cart moi

const Data_Example = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    quantity: 1,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
    quantity: 2,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    name: 'Product 3',
    price: 300,
    quantity: 3,
    image: 'https://via.placeholder.com/150'
  }
]

export default function CartPage() {
  const [checkedAll, setCheckedAll] = useState<boolean>(false)
  const productLength = Data_Example.length

  const [productNotChecked, setProductNotChecked] =
    useState<number>(productLength)
  const maxCost = useRef(0)
  useEffect(() => {
    for (let i = 0; i < productLength; i++) {
      maxCost.current += Data_Example[i].price * Data_Example[i].quantity
      console.log(maxCost.current)
    }
  }, [])
  const [totalCost, setTotalCost] = useState<number>(0)

  useEffect(() => {
    if (productNotChecked === 0) {
      setCheckedAll(true)
      setProductNotChecked(productLength)
    }
  }, [productNotChecked])

  return (
    <div className='flex flex-col w-full h-full gap-5'>
      <div className=' text-[2rem] font-bold'>Cart</div>
      <div className=' flex md:flex-row flex-col h-fit w-full gap-5 '>
        <div className=' flex flex-col bg-slate-50 h-full md:w-[70%] w-full border-[0.5px] border-black'>
          <div className=' mt-2 grid items-center grid-cols-14 grid-flow-col grid-rows-1 font-bold'>
            <div className=' ml-2 md:ml-5'>
              <Checkbox
                color={colors.blackColor}
                checked={checkedAll}
                onClick={() => {
                  if (checkedAll) {
                    setCheckedAll(false)
                    setProductNotChecked(productLength)
                    setTotalCost(0)
                  } else {
                    setCheckedAll(true)
                    setProductNotChecked(0)
                    setTotalCost(maxCost.current)
                  }
                }}
              />
            </div>
            <p className=' flex justify-center col-span-6 text-ellipsis whitespace-nowrap overflow-hidden mx-1'>
              Product
            </p>
            <p className='flex justify-center text-ellipsis col-span-2 whitespace-nowrap overflow-hidden mx-1'>
              Price
            </p>
            <div className='flex justify-center col-span-2 mx-1'>
              <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
                Quantity
              </p>
            </div>
            <div className='flex justify-center col-span-2  mx-1'>
              <p className='text-ellipsis whitespace-nowrap overflow-hidden'>
                Cost
              </p>
            </div>
            <FaTrash />
          </div>
          {Data_Example.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              image={item.image}
              checkedAll={checkedAll}
              setCheckedAll={setCheckedAll}
              setProductNotChecked={setProductNotChecked}
              setTotalCost={setTotalCost}
            />
          ))}
        </div>

        <div className='flex flex-col bg-slate-50 h-full md:w-[30%] p-5 w-full border-[0.5px] border-black'>
          <p className='w-full h-fit text-[1.5rem]'>Tam tinh</p>
          <div className='w-full h-fit flex flex-col items-end '>
            <p className=' font-bold text-[1.5rem]'>{formatMoney(totalCost)}</p>
            <p className=' font-thin text-sm'>chua tinh phi van chuyen</p>
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
                'order'
              )
            }}
          >
            Order
          </button>
        </div>
      </div>
    </div>
  )
}

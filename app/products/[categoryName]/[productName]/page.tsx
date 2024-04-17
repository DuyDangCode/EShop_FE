'use client'
import Image from 'next/image'
import Monior_Example from '@/public/vector/monitor_example.svg'
import {
  ActionIcon,
  Button,
  NumberInput,
  NumberInputHandlers,
  Rating
} from '@mantine/core'
import { formatMoney } from '@/utils/string.utils'
import { useRef, useState } from 'react'
import { IconPlus, IconMinus } from '@tabler/icons-react'
import { colors } from '@/constrant/colors'

export default function ProductDetailPage() {
  //TODO:"lam api get san pham theo slug"
  const [quantity, setQuantity] = useState<number>(0)
  const setNewQuantity = useRef<NumberInputHandlers>(null)

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-fit flex flex-col md:flex-row justify-center items-center'>
        {/* image */}
        <div className='flex justify-center flex-[1] md:mb-20 mb-0 '>
          <Image alt='product' height={200} src={Monior_Example} />
        </div>
        <div className='flex flex-col flex-[2] h-fit gap-3 m-5 '>
          <div className='flex flex-col gap-1'>
            <p>Brand: {'Laptop'}</p>
            <p className=' text-[2rem]'>{'may tinh luong tu'}</p>
            <Rating defaultValue={5} readOnly />
          </div>
          <div className=' text-[2.5rem]'>{formatMoney(0)}</div>
          <div className='flex flex-col'>
            <p>Quantity</p>
            <div className='flex justify-center items-center w-fit'>
              <ActionIcon
                color={colors.blackColor}
                onClick={() => {
                  setNewQuantity.current?.increment()
                }}
              >
                <IconPlus />
              </ActionIcon>
              <NumberInput
                mx={10}
                min={1}
                hideControls
                max={1000000}
                clampBehavior='strict'
                step={1}
                allowNegative={false}
                allowDecimal={false}
                thousandSeparator=' '
                stepHoldDelay={500}
                stepHoldInterval={100}
                defaultValue={1}
                handlersRef={setNewQuantity}
              />

              <ActionIcon
                color={colors.blackColor}
                onClick={() => {
                  setNewQuantity.current?.decrement()
                }}
              >
                <IconMinus />
              </ActionIcon>
            </div>
          </div>
          <div className='flex md:flex-row flex-col gap-5 md:w-1/2 w-full h-[100px]'>
            <Button color='green' className='flex-[1]'>
              Buy now
            </Button>
            <Button color='red' className='flex-[1]'>
              Add to cart
            </Button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}

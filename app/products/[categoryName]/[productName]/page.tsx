'use client'
import Image from 'next/image'
import Monior_Example from '@/public/vector/monitor_example.svg'
import {
  ActionIcon,
  Button,
  LoadingOverlay,
  NumberInput,
  NumberInputHandlers,
  Pagination,
  Rating,
} from '@mantine/core'
import { formatMoney } from '@/utils/string.utils'
import { useRef, useState } from 'react'
import { IconPlus, IconMinus, IconStar } from '@tabler/icons-react'
import { colors } from '@/constrant/colors'
import Comment from '@/components/Comment/Comment'
import '../../../globals.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { apiHelper } from '@/helper/router'
import { X_API_KEY } from '@/constrant/system'

interface ProductDetailPageProps {
  params: {
    productName: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState<number>(0)
  const setNewQuantity = useRef<NumberInputHandlers>(null)
  const numberOfReview = 10
  const [chosenRating, setChosenRating] = useState<number>(0)
  const { data, isPending } = useQuery({
    queryKey: [params.productName],
    queryFn: async () => {
      return await axios
        .get(apiHelper.getOneProductBySlug(params.productName), {
          headers: {
            'x-api-key': X_API_KEY,
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          throw err
        })
    },
  })
  function convertObjectToArray(object: any) {
    const results = []
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        results.push(`${key}: ${object[key]}`)
      }
    }
    return results
  }

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-fit flex flex-col md:flex-row justify-center items-center'>
        {/* image */}
        <div className='flex justify-center flex-[1] md:mb-20 mb-0 '>
          <Image
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='min-h-[150px] w-full h-auto md:p-20'
            src={data?.metadata?.product_thumb}
          />
        </div>
        <div className='flex flex-col flex-[2] h-fit gap-3 m-5 '>
          <div className='flex flex-col gap-1'>
            <p>Brand: {data?.metadata?.product_type}</p>
            <p className=' text-[2rem] font-bold'>
              {data?.metadata?.product_name}
            </p>
            <Rating value={data?.metadata?.product_rating} readOnly />
          </div>
          <div className=' text-[2.5rem]'>
            {formatMoney(data?.metadata?.product_price)}
          </div>
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
      <div className='flex flex-col p-5 justify-start'>
        <p className=' text-[1.2rem] font-bold'>Detail:</p>
        <div className='flex m-4 flex-col'>
          {convertObjectToArray(data?.metadata?.product_attributes).map(
            (item: any, index: number) => (
              <p key={index}>{item}</p>
            ),
          )}
        </div>
      </div>
      <div className='flex flex-col p-5 justify-center w-full h-fit'>
        <p className=' text-[1.2rem] font-bold'>Reviews: </p>
        {numberOfReview ? (
          <div className='w-full flex md:flex-row flex-col justify-center gap-3 items-center'>
            <div className='flex flex-row w-fit justify-center items-center'>
              <div className='flex flex-col w-fit h-fit justify-center items-center'>
                <p className=' font-bold text-[1.7rem]'>{'3/5'}</p>
                <Rating defaultValue={5} readOnly />
                <p className=' text-[1rem]'>{`(${2} reviews)`}</p>
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-3'>
              <div className='flex flex-row gap-3'>
                {Array.from({ length: 3 }).map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={
                        index === chosenRating
                          ? 'font-bold  flex justify-center items-center bg-white text-orange-500 border-[1px] border-black p-2 rounded-md w-20 h-9'
                          : 'flex justify-center items-center text-black bg-white border-[1px] border-black p-2 rounded-md w-20 h-9'
                      }
                      onClick={() => {
                        setChosenRating(index)
                      }}
                    >
                      {index === 0 ? (
                        'All'
                      ) : (
                        <p className=' flex justify-center items-center w-full gap-1 h-full'>
                          {index}
                          <span>
                            <IconStar />
                          </span>
                        </p>
                      )}
                    </button>
                  )
                })}
              </div>
              <div className='flex flex-row gap-3'>
                {Array.from({ length: 3 }).map((item, index) => {
                  return (
                    <button
                      key={index + 3}
                      className={
                        index + 3 === chosenRating
                          ? 'font-bold  flex justify-center items-center bg-white text-orange-500 border-[1px] border-black p-2 rounded-md w-20 h-9'
                          : 'flex justify-center items-center text-black bg-white border-[1px] border-black p-2 rounded-md w-20 h-9'
                      }
                      onClick={() => {
                        setChosenRating(index + 3)
                      }}
                    >
                      <p className=' flex justify-center items-center w-full gap-1 h-full'>
                        {index + 3}
                        <span>
                          <IconStar />
                        </span>
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          <p className=' text-gray-400'>No review</p>
        )}
      </div>
      <div className='w-full flex flex-col h-fit items-center'>
        <Comment />
        <Comment />

        <Pagination
          classNames={{
            control: 'pagination-control',
          }}
          total={10}
          color={colors.blackColor}
        />
      </div>
      <LoadingOverlay
        visible={isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
    </div>
  )
}

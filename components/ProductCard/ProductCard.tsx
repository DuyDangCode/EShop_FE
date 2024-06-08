'use client'
import Image from 'next/image'
import Monior_Example from '@/public/vector/monitor_example.svg'
import { convertToSlug, formatAmount, formatMoney } from '@/utils/string.utils'
import { FaCircleCheck, FaPhone } from 'react-icons/fa6'
import RatingStar from '@/components/RatingStar/RatingStar'
import { ActionIcon } from '@mantine/core'
import { IconShoppingCartPlus } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { apiHelper, pathHelper } from '@/helper/router'
import { useMutation } from '@tanstack/react-query'
import apiInstance from '@/axiosInstance'
import { promiseToast } from '@/utils/promiseToast.utils'
import { queryClient } from '@/app/queryClient'
import toast from 'react-hot-toast'
import { data } from 'autoprefixer'

interface ProductCardProps {
  productId: string
  name: string
  price: number
  priceBeforeDiscount: number
  srcImage: string
  ratingScore: number
  reviewAmount: number
  quantity: number
  category: string
  slug: string
}

export default function ProductCard({
  productId,
  name,
  price,
  priceBeforeDiscount,
  srcImage,
  ratingScore,
  reviewAmount,
  quantity,
  category,
  slug,
}: ProductCardProps) {
  // console.log(productId)
  // const addMutation = useMutation({
  //   mutationKey: ['addToCart', name, 1],
  //   mutationFn: async () => {
  //     const addProductPromise = apiInstance.post(apiHelper.cart(), {
  //       product: {
  //         productId: productId,
  //         productQuantity: 1,
  //       },
  //     })
  //     promiseToast(addProductPromise, 'Add product sucessful', 'Fail')
  //     return await addProductPromise
  //       .then((res) => res.data)
  //       .catch((err) => {
  //         console.log(err)
  //         throw err
  //       })
  //   },
  //   onError: (err) => {
  //     toast.error(err?.message)
  //   },
  // })

  function addProductToCart(productId: string) {
    const addProductPromise = apiInstance.post(apiHelper.cart(), {
      product: {
        productId: productId,
        productQuantity: 1,
      },
    })
    promiseToast(addProductPromise, 'Add product sucessful', 'Fail')
  }

  return (
    <div className=' cursor-pointer px-5 py-3 flex flex-col bg-white  max-w-[14.5rem] min-h-[21.65rem] h-fit w-fit hover:border-purple-500 border-transparent border-[1px] duration-500 hover:translate-y-[-1rem]'>
      {/* status */}
      {quantity > 0 ? (
        <div className=' flex flex-row gap-2 text-color-green'>
          <FaCircleCheck />
          <p className=' text-[0.75rem] '>In stock</p>
        </div>
      ) : (
        <div className=' flex flex-row gap-2 text-red-500'>
          <FaPhone />
          <p className=' text-[0.75rem] '>check availability</p>
        </div>
      )}
      {/* image */}
      <Link
        href={pathHelper.productDetail(convertToSlug(category), slug)}
        className=' flex-[6] w-full flex justify-center'
      >
        <Image
          alt='product'
          src={srcImage}
          width='0'
          height='0'
          sizes='100vw'
          className='w-full h-auto'
        />
      </Link>
      {/* review */}
      <Link
        href={pathHelper.productDetail(convertToSlug(category), slug)}
        className=' flex-[1] flex flex-row items-center gap-3 justify-start'
      >
        <RatingStar defaultScore={ratingScore} readOnly={true} />
        <span className=' text-[0.8rem] text-color-silver mt-1'>{`Review(${formatAmount(
          reviewAmount,
        )})`}</span>
      </Link>
      {/* name */}
      <Link
        href={pathHelper.productDetail(convertToSlug(category), slug)}
        className=' flex-[4] max-h-14 overflow-hidden text-ellipsis whitespace-nowrap'
      >
        {name}
      </Link>
      <div className='flex flex-col gap-0 w-full'>
        <Link
          href={pathHelper.productDetail(convertToSlug(category), slug)}
          className=' text-[1rem] font-normal text-color-silver line-through overflow-hidden whitespace-nowrap text-ellipsis'
        >
          {formatMoney(priceBeforeDiscount)}
        </Link>
        <div className='w-full flex flex-row justify-between items-center'>
          <Link
            href={pathHelper.productDetail(convertToSlug(category), slug)}
            className=' text-[1.7rem] font-medium text-black overflow-hidden whitespace-nowrap text-ellipsis '
          >
            {formatMoney(price)}
          </Link>
          <ActionIcon
            color='black'
            onClick={() => {
              addProductToCart(productId)
            }}
          >
            <IconShoppingCartPlus />
          </ActionIcon>
        </div>
      </div>
    </div>
  )
}

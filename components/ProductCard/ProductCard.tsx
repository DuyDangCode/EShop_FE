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
import { pathHelper } from '@/helper/router'

interface ProductCardProps {
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
  name,
  price,
  priceBeforeDiscount,
  srcImage,
  ratingScore,
  reviewAmount,
  quantity,
  category,
  slug
}: ProductCardProps) {
  return (
    <Link
      href={pathHelper.productDetail(convertToSlug(category), slug)}
      className=' px-5 py-3 flex flex-col bg-white  max-w-[14.5rem] min-h-[21.65rem] h-fit w-fit hover:border-purple-500 border-transparent border-[1px] duration-500 hover:translate-y-[-1rem]'
    >
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
      <div className=' flex-[6] w-full flex justify-center'>
        <Image alt='product' src={Monior_Example} />
      </div>
      {/* review */}
      <div className=' flex-[1] flex flex-row items-center gap-3 justify-start'>
        <RatingStar defaultScore={ratingScore} readOnly={true} />
        <span className=' text-[0.8rem] text-color-silver mt-1'>{`Review(${formatAmount(
          reviewAmount
        )})`}</span>
      </div>
      {/* name */}
      <div className=' flex-[4] max-h-14 overflow-hidden text-ellipsis whitespace-nowrap'>
        {name}
      </div>
      <div className='flex flex-col gap-0 w-full'>
        <p className=' text-[1rem] font-normal text-color-silver line-through overflow-hidden whitespace-nowrap text-ellipsis'>
          {formatMoney(priceBeforeDiscount)}
        </p>
        <div className='w-full flex flex-row justify-between items-center'>
          <p className=' text-[1.7rem] font-medium text-black overflow-hidden whitespace-nowrap text-ellipsis '>
            {formatMoney(price)}
          </p>
          <ActionIcon color='black'>
            <IconShoppingCartPlus />
          </ActionIcon>
        </div>
      </div>
    </Link>
  )
}

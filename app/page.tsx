'use client'
import ProductCard from '@/components/ProductCard/index'
import { pathHelper } from '@/helper/router'
import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import carousel1 from '@/public/vector/carousel1.svg'
import carousel2 from '@/public/vector/carousel2.svg'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='w-full h-full flex flex-col items-center  overflow-hidden'>
      <Carousel showArrows={true} className=' w-full md:px-6 px-0'>
        <div>
          <Image src={carousel1} alt='' />
        </div>
        <div>
          <Image src={carousel1} alt='' />
        </div>
      </Carousel>
      <h1 className='h-fit w-full px-6 font-bold mb-5 md:text-lg sm:text-sm'>
        New products
      </h1>

      <div className=' md:grid lg:grid-rows-2 lg:grid-cols-5  lg:max-[1300px]:grid-rows-3 lg:max-[1300px]:grid-cols-4 md:grid-rows-4 md:grid-cols-3  md:grid-flow-row h-fit w-full flex flex-col justify-center items-center lg:px-16 md:px-8 px-2'>
        {Array.from({ length: 10 }).map((item, index) => {
          return (
            <ProductCard
              key={index}
              name={
                'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On the store aaaaaaaaaaaaaaa'
              }
              price={500}
              priceBeforeDiscount={1000}
              srcImage={'asas'}
              ratingScore={3}
              reviewAmount={300}
              quantity={0}
            />
          )
        })}
      </div>
    </div>
  )
}

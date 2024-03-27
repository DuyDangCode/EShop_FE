'use client'
import ProductCard from '@/components/ProductCard'
import { pathHelper } from '@/helper/router'
import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function Home() {
  return (
    <div>
      <Carousel width={'1200px'}></Carousel>
      <div className='flex w-fit'>
        <ProductCard
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
        <ProductCard
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
        <ProductCard
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
        <ProductCard
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
        <ProductCard
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
      </div>
      <div className='flex w-full'>
        <ProductCard
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
        <ProductCard
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
        <ProductCard
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
        <ProductCard
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
        <ProductCard
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
      </div>
    </div>
  )
}

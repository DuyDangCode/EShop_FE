'use client'
import ProductCard from '@/components/ProductCard/ProductCard'
import { Pagination } from '@mantine/core'

interface CategoryPageProps {
  params: {
    categoryName: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <div className='w-full h-full flex justify-center items-center flex-col gap-5'>
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
              category={params.categoryName}
              slug={'may-tinh-luong-tu-3'}
            />
          )
        })}
      </div>
      <Pagination total={10} color='black' />
    </div>
  )
}

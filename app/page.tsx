import ProductCard from '@/components/ProductCard/ProductCard'
import CarouselMainPage from '@/components/CarouselMainPage/CarouselMainPage'
import { apiHelper } from '@/helper/router'
import { X_API_KEY } from '@/constrant/system'
import { metadata } from './layout'

async function getProduct() {
  const res = await fetch(apiHelper.getAllPublishedProductsPRO(10, 1), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': X_API_KEY
    },
    next: {
      revalidate: 18000
    }
  })

  if (!res.ok) {
    throw new Error('Something went wrong!')
  }

  return res.json()
}

export default async function Home() {
  const data = await getProduct().catch((err) => {
    return {
      status: 400,
      metadata: err.message
    }
  })
  return (
    <div className='w-full h-full flex flex-col items-center  overflow-hidden'>
      <CarouselMainPage />
      <h1 className='h-fit w-full px-6 font-bold mb-5 md:text-lg sm:text-sm'>
        New products
      </h1>

      <div className=' md:grid lg:grid-rows-2 lg:grid-cols-5  lg:max-[1300px]:grid-rows-3 lg:max-[1300px]:grid-cols-4 md:grid-rows-4 md:grid-cols-3  md:grid-flow-row h-fit w-full flex flex-col justify-center items-center lg:px-16 md:px-8 px-2'>
        {data.status === 400 ? (
          <p>{data.metadata}</p>
        ) : (
          data.metadata.map((item: any, index: number) => {
            return (
              <ProductCard
                key={index}
                name={item.product_name}
                price={item.product_price}
                priceBeforeDiscount={item.product_price * 10}
                srcImage={item.product_thumb}
                ratingScore={item.product_rating}
                reviewAmount={500}
                quantity={10}
                category={'laptop'}
                slug={item.product_name}
              />
            )
          })
        )}
      </div>
    </div>
  )
}

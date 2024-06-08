'use client'
import ProductCard from '@/components/ProductCard/ProductCard'
import { Pagination } from '@mantine/core'
import { apiHelper } from '@/helper/router'
import { X_API_KEY } from '@/constrant/system'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { LIMIT_PRODUCT } from '@/constrant/query'
import { LoadingOverlay, Button, Group, Box } from '@mantine/core'
import { IconMoodSadSquint } from '@tabler/icons-react'

interface CategoryPageProps {
  params: {
    categoryName: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [page, setPage] = useState(1)
  const { data, isPending, isError } = useQuery({
    queryKey: ['products', params.categoryName, page],
    queryFn: async () => {
      return await axios.get(
        apiHelper.getAllPublishedProductsByCategoryPRO(
          params.categoryName,
          LIMIT_PRODUCT,
          page,
        ),
        {
          headers: {
            'x-api-key': X_API_KEY,
          },
        },
      )
    },
  })
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    axios
      .get(apiHelper.getTotalPublishedProduct(params.categoryName), {
        headers: {
          'x-api-key': X_API_KEY,
        },
      })
      .then((res) => {
        setTotal(Math.ceil(res.data.metadata.total / LIMIT_PRODUCT))
      })
  }, [params.categoryName])
  return (
    <div className='w-full h-full flex justify-center items-center flex-col gap-5'>
      <div className=' md:grid lg:grid-rows-2 lg:grid-cols-5  lg:max-[1300px]:grid-rows-3 lg:max-[1300px]:grid-cols-4 md:grid-rows-4 md:grid-cols-3  md:grid-flow-row h-fit w-full flex flex-col justify-center items-center lg:px-16 md:px-8 px-2'>
        {data?.data.metadata.map((item: any) => (
          <ProductCard
            productId={item._id}
            key={item._id}
            name={item.product_name}
            price={item.product_price}
            priceBeforeDiscount={item.product_price + 0.2 * item.product_price}
            srcImage={item.product_thumb}
            ratingScore={item.product_rating}
            reviewAmount={item.product_review_amout}
            quantity={item.product_quantity}
            category={params.categoryName}
            slug={item.product_slug}
          />
        ))}
      </div>
      <Pagination total={total} color='black' value={page} onChange={setPage} />
      {(data?.data.metadata.length == 0 || isError) && (
        <div className='flex flex-row  w-full gap-2 text-lg justify-center items-center text-black'>
          <IconMoodSadSquint size={25} />
          <p>Not found products</p>
        </div>
      )}
      <LoadingOverlay
        visible={isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'black', type: 'bars' }}
      />
    </div>
  )
}

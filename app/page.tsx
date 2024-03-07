import ProductCard from '@/components/ProductCard'
import { pathHelper } from '@/helper/router'
import Link from 'next/link'

export default async function Home() {
  return (
    <div>
      <div className=' flex'>
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

      <Link href={pathHelper.signin()}>Sign in page</Link>
    </div>
  )
}

'use client'
import { Carousel } from 'react-responsive-carousel'
import carousel1 from '@/public/vector/carousel1.svg'
import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function CarouselMainPage() {
  return (
    <Carousel
      showArrows={true}
      showThumbs={false}
      className=' w-full md:px-6 px-0'
    >
      <div>
        <Image src={carousel1} alt='' />
      </div>
      <div>
        <Image src={carousel1} alt='' />
      </div>
    </Carousel>
  )
}

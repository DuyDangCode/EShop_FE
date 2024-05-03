import { Divider } from '@mantine/core'
import ProductItem from './ProductItem'

export default function Order() {
  return (
    <div className='flex flex-col p-3 w-full h-fit border-[1px] border-black rounded-md'>
      <div className=' w-full h-5'>Order: {123123123}</div>
      <Divider my='md' />
      <div className='flex flex-col w-full h-fit gap-2'>
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
      <Divider my='md' />
      <div className='flex justify-end items-center w-full'>
        Total cost: {339999}
      </div>
    </div>
  )
}

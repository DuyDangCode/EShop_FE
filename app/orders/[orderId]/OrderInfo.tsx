import { Divider } from '@mantine/core'

export default function OrderInfo() {
  return (
    <div className='flex flex-col gap-3 w-full h-fit p-5'>
      {/*  User */}
      <div className='flex p-2 border-black gap-1 border-[1px] rounded-md flex-col w-full h-fit'>
        <p>Order information</p>
        <div className='flex flex-col'>
          <div className='flex '>
            <p>Customer:</p>
            <p>Nguyen Van A</p>
          </div>
          <div className='flex '>
            <p>Phone:</p>
            <p>Nguyen Van A</p>
          </div>
          <div className='flex '>
            <p>Address:</p>
            <p>Nguyen Van A</p>
          </div>
        </div>
      </div>

      {/* Order */}
      <div className='flex flex-col h-fit w-full md:flex-row gap-3'>
        <div className=' p-2 border-black gap-1 border-[1px] rounded-md flex flex-[1] flex-col h-fit w-full'>
          <div className='flex w-full'>
            <p>Total products: </p>
            <p>{1}</p>
          </div>
          <Divider />
          <div className='flex  flex-col w-full h-fit'>
            <div className='flex w-full h-fit'>
              <p>Total1111: </p>
              <p>{1}</p>
            </div>
            <div className='flex w-full h-fit'>
              <p>Shipping fee: </p>
              <p>{1}</p>
            </div>
            <div className='flex w-full h-fit'>
              <p>Discount: </p>
              <p>{1}</p>
            </div>
          </div>
          <Divider />
          <div className='flex w-full'>
            <p>Total cost: </p>
            <p>{1}</p>
          </div>
        </div>

        <div className='flex-[1] border-black border-[1px] rounded-md p-2 '>
          <p>Note......</p>
        </div>
      </div>
    </div>
  )
}

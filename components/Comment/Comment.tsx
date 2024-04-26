import { Avatar, Rating } from '@mantine/core'
import avatarExapmle from '@/public/images/avatarExample.png'

export default function Comment() {
  return (
    <div className='flex w-full h-fit justify-start p-5'>
      <div className=' flex-[1] flex justify-center items-start pt-1  '>
        <Avatar src={avatarExapmle.src} size={'lg'} />
      </div>
      <div className=' flex-[10] flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <p>Name</p>
          <Rating defaultValue={5} />
          <p>Date</p>
        </div>
        <div className=' text-[0.8rem]'>Good</div>
        {/* <div className='w-full flex h-fit justify-center items-center'>
          show more
        </div> */}
      </div>
    </div>
  )
}

import {
  IconChecklist,
  IconPackage,
  IconTruckDelivery,
  IconStar,
} from '@tabler/icons-react'
export default function OrderStatus() {
  return (
    <div className='flex border-black rounded-md border-[1px] py-2 justify-center items-center bg-white flex-row w-full h-fit'>
      <IconChecklist size={30} className='flex-1' />
      <IconPackage size={30} className='flex-1' />
      <IconTruckDelivery size={30} className='flex-1' />
      <IconStar size={30} className='flex-1' />
    </div>
  )
}

import RatingStar from '../RatingStar'

export default function ProductCard() {
  console.log('a')
  return (
    <div className='flex flex-col bg-slate-200 w-[200px] h-[300px]'>
      {/* status */}
      <div className=' flex-[1]'>In stock</div>
      {/* image */}
      <div className=' flex-[6]'>Image</div>
      {/* review */}
      <div className=' flex-[1] flex-row flex-wrap justify-between'>
        <RatingStar defaultScore={5} readOnly={false} size={25} />
        <span className='text-[13px]'>{`Review(${3})`}</span>
      </div>
      {/* name */}
      <div className=' flex-[4] '>dien thoai sam sung </div>
      {/* old price */}
      <div className=' flex-[2]'>1000</div>
      {/*  price */}
      <div className=' flex-[3]'>500</div>
    </div>
  )
}

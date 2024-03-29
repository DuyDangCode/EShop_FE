'use client'

interface PanigationProps {
  n: number
  select: number
  callBack: Function
}

export default function Panigation({
  n = 1,
  select = 1,
  callBack = (index: number) => {}
}: PanigationProps) {
  return (
    <div className='flex flex-row h-fit w-full justify-evenly items-center px-20 pt-8 pb-3'>
      {Array.from({ length: n }).map((item, index) => (
        <div
          key={index}
          className={
            index + 1 === select
              ? 'text-red-500 font-bold border-2 rounded-full w-6 h-6 border-red-500 justify-center flex items-center cursor-pointer'
              : 'text-black border-2 font-bold rounded-full w-6 h-6 border-black justify-center flex items-center cursor-pointer'
          }
          onClick={() => {
            callBack(index + 1)
          }}
        >
          {index + 1}
        </div>
      ))}
    </div>
  )
}

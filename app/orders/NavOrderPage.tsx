'use client'

import { useState } from 'react'

interface NavOrderPageProps {
  state: string
  setState: Function
}
export default function NavOrderPage({ state, setState }: NavOrderPageProps) {
  const STATUS = [
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
    'Returned',
  ]
  return (
    <div
      className=' py-2
       bg-white flex justify-evenly border-black rounded-md border-[1px] items-center w-full h-fit'
    >
      {STATUS.map((item) => (
        <button
          key={item}
          className={state == item ? 'flex-1 font-bold' : 'flex-1'}
          onClick={() => {
            setState(item)
          }}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

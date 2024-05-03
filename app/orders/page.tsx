'use client'

import { useState } from 'react'
import NavOrderPage from './NavOrderPage'
import Order from './Order'

export default function OrderPage() {
  const [state, setState] = useState('Pending')
  return (
    <div className='flex w-full gap-2 h-fit justify-center items-center flex-col'>
      <NavOrderPage state={state} setState={setState}></NavOrderPage>
      <Order />
    </div>
  )
}

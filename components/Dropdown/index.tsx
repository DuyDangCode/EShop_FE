'use client'

import { useEffect, useRef, useState } from 'react'

export default function Dropdown({
  display = false,
  setDisplay,
  children
}: {
  display: boolean
  children: React.ReactNode
  setDisplay: Function
}) {
  // const [display, setDisplay] = useState<boolean>()
  const ref = useRef<any>()
  useEffect(() => {
    const handler = (event: any) => {
      if (display && ref.current && !ref.current.contains(event.target)) {
        setDisplay(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [display, setDisplay])

  return (
    <div
      className={
        display
          ? ' flex flex-col z-50 bg-white   absolute border-black border-[1px] right-5 bottom-[-30px] w-[150px] '
          : 'invisible'
      }
      ref={ref}
      onMouseLeave={() => {
        setDisplay(false)
      }}
    >
      {children}
    </div>
  )
}

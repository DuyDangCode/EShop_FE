'use client'

import { useState } from 'react'

interface RatingStarInterface {
  defaultScore: number
  readOnly: boolean
}

export default function RatingStar({
  defaultScore = 5,
  readOnly = false
}: RatingStarInterface) {
  // const defaultStyle = `text-[${size}px] cursor-pointer`
  // const on = `text-[#E9A426] ${defaultStyle}`
  // const off = `text-[#CACDD8] ${defaultStyle}`

  const defaultStyle = 'text-[1.6rem] cursor-pointer'
  const on = 'text-[#E9A426] ' + defaultStyle
  const off = 'text-[#CACDD8] ' + defaultStyle
  const [score, setScore] = useState(defaultScore - 1)
  return (
    <div className='flex flex-row gap-0 cursor-default w-fit h-full'>
      {[...Array(5)].map((star, index) => (
        <span
          key={index}
          className={score >= index ? on : off}
          onClick={() => {
            if (!readOnly) setScore(index)
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  )
}

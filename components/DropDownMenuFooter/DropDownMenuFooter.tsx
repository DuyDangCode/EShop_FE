'use client'
import { pathHelper } from '@/helper/router'
import Link from 'next/link'
import { useState } from 'react'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa6'

interface DropDownMenuFooterProps {
  title: string
  names: Array<string>
  links: Array<string>
}

export default function DropDownMenuFooter({
  title,
  names,
  links
}: DropDownMenuFooterProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      onClick={() => {
        setOpen(!open)
      }}
      className=' cursor-pointer border-b-[1px] border-white h-fit w-full'
    >
      <div className='flex w-full justify-between items-center'>
        <h2 className=' text-white font-semibold '>{title}</h2>
        {open ? (
          <FaAngleUp className=' text-white' />
        ) : (
          <FaAngleDown className=' text-white' />
        )}
      </div>
      {open && (
        <ul className='mt-2'>
          {names.map((name: string, index: number) => (
            <li key={name}>
              <Link
                className=' w-full text-white font-light'
                href={pathHelper.product(links[index])}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

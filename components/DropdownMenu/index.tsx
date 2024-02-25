'use client'

interface DropDownMenuProps {
  items: Array<any>
  actions: Array<Function>
}

export default function DropDownMenu({ items, actions }: DropDownMenuProps) {
  return (
    <div className=' absolute border-black border-[1px] z-50 left-5 top-[50px] w-[200px] bg-white'>
      <ul className=' m-2'>
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => actions[index]()}
            className=' cursor-pointer'
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

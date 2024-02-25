'use client'

interface DropDownMenuProps {
  items: Array<any>
  actions: Array<Function>
}

export default function DropDownMenu({ items, actions }: DropDownMenuProps) {
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => actions[index]()}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

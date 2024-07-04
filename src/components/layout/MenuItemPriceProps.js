import Trash from '@/components/icons/Trash'
import ToggleUp from '@/components/icons/ToggleUp'
import ToggleDown from '@/components/icons/ToggleDown'
import Plus from '@/components/icons/Plus'
import { useState } from 'react'

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  const [isOpen, setIsOpen] = useState(false)

  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: '', price: 0 }]
    })
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value
    setProps((prevProps) => {
      const newProps = [...prevProps]
      newProps[index][prop] = newValue
      return newProps
    })
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((value, index) => index !== indexToRemove))
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <div className="flex gap-1 items-center">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
          className="inline-flex p-1 border-0 justify-start"
        >
          {!isOpen && <ToggleDown />}

          {isOpen && <ToggleUp />}
          <div>
            <span>{name}</span>
            <span>({props?.length})</span>
          </div>
        </button>
      </div>
      <div className={isOpen ? 'block' : 'hidden'}>
        {props?.length > 0 &&
          props.map((itemValue, index) => (
            <div className="flex gap-2 items-end">
              <div>
                <label>Name</label>
                <input
                  autoFocus
                  type="text"
                  placeholder="Name"
                  value={itemValue.name}
                  onChange={(ev) => editProp(ev, index, 'name')}
                />
              </div>
              <div>
                <label>ExtraPrice</label>
                <input
                  type="text"
                  placeholder="Price"
                  value={itemValue.price}
                  onChange={(ev) => editProp(ev, index, 'price')}
                />
              </div>
              <div className="mb-2">
                <button
                  type="button"
                  onClick={() => removeProp(index)}
                  className="bg-gray-100 px-2 hover:bg-red-200"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addProp}
          className="bg-gray-100 items-center hover:bg-red-200"
        >
          <Plus className="w-6 h-6" />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  )
}

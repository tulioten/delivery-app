import Image from 'next/image'
import { cartProductPrice } from '../AppContext'
import Trash from '../icons/Trash'

export default function CartProduct({ product, onRemove, index }) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24 min-w-[120px]">
        <Image width={240} height={240} src={product.image} alt="" />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.name}</h3>
        {product.size && (
          <div className="text-sm text-gray-700">
            <div>Size:</div>
            <span className="text-xs ml-3 text-gray-500">
              {product.size.name}
            </span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm ">
            Extras:
            {product.extras.map((extra) => (
              <div key={extra.name} className="text-xs ml-3 text-gray-400">
                {extra.name} ${extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">${cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
          <button type="button" onClick={() => onRemove(index)} className="p-2">
            <Trash />
          </button>
        </div>
      )}
    </div>
  )
}

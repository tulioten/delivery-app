export default function MenuItemTile({ props, ...item }) {
  const { image, name, description, basePrice } = item
  return (
    <div className="bg-gray-200 p-4 flex flex-col rounded-lg text-center group hover:bg-red-200 hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img
          src={image}
          alt="Food Image"
          className="w-full h-24 block mx-auto object-contain"
        />
      </div>

      <div className="block">
        <h4 className="font-semibold text-xl my-2">{name}</h4>
        <p className="text-gray-500 text-sm my-2 line-clamp-3">{description}</p>
      </div>
      <div className="flex-1 flex items-end ">
        <button
          type="button"
          onClick={props}
          className="bg-primary text-white py-2 font-semibold px-4  mt-2 rounded-full"
        >
          Add to cart for ${basePrice}
        </button>
      </div>
    </div>
  )
}

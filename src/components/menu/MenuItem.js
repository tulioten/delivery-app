export default function MenuItem() {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-red-200 hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img
          src="/pizza.png"
          alt="pizza"
          className="max-w-auto max-h-36 block mx-auto "
        />
      </div>

      <h4 className="font-semibold text-xl my-2">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </p>
      <button className="bg-primary text-white py-2 font-semibold px-4  mt-2 rounded-full">
        {' '}
        Add to cart $12
      </button>
    </div>
  )
}

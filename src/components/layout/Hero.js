import Image from 'next/image'
import Right from '../icons/RightArrow'

export default function Hero() {
  return (
    <section className="hero mt-8">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
          Everything <br /> is better
          <br /> with a&nbsp;<span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life.
        </p>
        <div className="flex gap-4 py-2 items-center">
          <button className="flex gap-2 justify-center uppercase bg-primary text-white font-semibold px-4 py-2 rounded-full">
            Order now
            <Right />
          </button>
          <button className="flex gap-1 py-2 border-0 items-center text-gray-600 font-semibold">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={'/pizza.png'}
          layout={'fill'}
          objectFit={'contain'}
          alt={'pizza'}
        />
      </div>
    </section>
  )
}

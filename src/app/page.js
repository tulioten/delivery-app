import Hero from '../components/layout/Hero'
import HomeMenu from '../components/layout/HomeMenu'
import SectionHeaders from '../components/layout/SectionHeaders'

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={'Our story'} mainHeader={'About us'} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-6">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis
            sit possimus ullam, animi blanditiis, fugit cupiditate omnis placeat
            error officia incidunt, ipsa beatae impedit velit alias voluptatum
            aliquam ducimus excepturi.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            laborum minus soluta expedita quidem necessitatibus repellendus
            voluptas eos rem. Cumque reprehenderit excepturi distinctio est fuga
            blanditiis unde, debitis tempore maxime.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
            provident unde architecto ipsa rem aut numquam qui nesciunt.
          </p>
        </div>
      </section>
      <section className="text-center my-16" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a
            className="text-3xl text-gray-500 underline"
            href="tel:+5585999999999"
          >
            +55 85 99999-9999
          </a>
        </div>
      </section>
    </>
  )
}

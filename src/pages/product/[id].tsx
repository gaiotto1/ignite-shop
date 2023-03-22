import { HomeContainer, Product } from '@/src/styles/pages/home'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { useKeenSlider } from 'keen-slider/react'

import camiseta1 from '@/src/assets/camisetas/1.png'
import camiseta2 from '@/src/assets/camisetas/2.png'
import camiseta3 from '@/src/assets/camisetas/3.png'

import 'keen-slider/keen-slider.min.css'

export default function Products() {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef}>
      <Product className="keen-slider__slide">
        <Image width={520} height={480} src={camiseta1} alt="" />

        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 59,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image width={520} height={480} src={camiseta2} alt="" />

        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 59,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image width={520} height={480} src={camiseta3} alt="" />

        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 59,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image width={520} height={480} src={camiseta3} alt="" />

        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 59,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image width={520} height={480} src={camiseta3} alt="" />

        <footer>
          <strong>Camiseta x</strong>
          <span>R$ 59,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
import { GetStaticProps } from 'next'
import Image from 'next/image'

import { useKeenSlider } from 'keen-slider/react'

import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import { HomeContainer, Product } from '@/src/styles/pages/home'

import 'keen-slider/keen-slider.min.css'
interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}


export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef}>
      {products.map(product => (
        <Product key={product.id} className="keen-slider__slide">
          <Image width={520} height={480} src={product.imageUrl} alt={product.name} />

          <footer>
          <strong>{product.name}</strong>
          <span>R$ {product.price}</span>
        </footer>
        </Product>
      ))}
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    if (!price.unit_amount) {
      price.unit_amount = 0
    }

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}
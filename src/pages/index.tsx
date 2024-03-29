import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

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
        <Link href={`product/${product.id}`} key={product.id} prefetch={false}>
          <Product className="keen-slider__slide">
          <Image width={520} height={480} src={product.imageUrl} alt={product.name} />

          <footer>
          <strong>{product.name}</strong>
          <span>{product.price}</span>
        </footer>
        </Product>
        </Link>
        
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
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100)
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}
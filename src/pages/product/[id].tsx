import Stripe from 'stripe'
import { stripe } from '@/src/lib/stripe'

import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { ImageContainer, ProductContainer, ProductDetails } from '@/src/styles/pages/product'
interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt={product.name} width={520} height={480} />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>
          {product.description}
        </p>

        <button type="button">Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_JZ2Z2Q2Q2Q2Q2Q' } }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }

  const product = await stripe.products.retrieve(id, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  if (!price.unit_amount) {
    price.unit_amount = 0
  }

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
        description: product.description,
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}
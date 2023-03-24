import { ImageContainer, ProductContainer, ProductDetails } from '@/src/styles/pages/product'
import { GetServerSideProps } from 'next'
import Image from 'next/image'

import { useRouter } from 'next/router'

export default function Product() {
  const router = useRouter()
  const { id } = router.query as { id: string }
  
  return (
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>

      <ProductDetails>
        <h1>Camiseta x</h1>
        <span>100,00</span>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quod. Quisquam, quod. Quisquam, quod. Quisquam, quod.
        </p>

        <button type="button">Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}
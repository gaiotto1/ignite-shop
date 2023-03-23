import { GetServerSideProps } from 'next'
import Image from 'next/image'

import { useRouter } from 'next/router'

export default function Product() {
  const router = useRouter()
  const { id } = router.query as { id: string }
  
  return (
    <h1>{id}</h1>
  )
}
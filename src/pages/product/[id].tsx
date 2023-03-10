import { useRouter } from 'next/router'

export default function Products() {
  const router = useRouter()
  const { id } = router.query as { id: string }

  return (
    <h1>Product {id}</h1>
  )
}
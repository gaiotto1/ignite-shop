import { styled } from '../styles'

const Button = styled('button', {
  backgroundColor: '$rocketseat',
  borderRadius: 10,

  span: {
    fontWeight: 700,
    color: 'red',
  },

  '&:hover': {
    backgroundColor: 'red',
    
    span: {
      color: 'white',
    }
  }
})

export default function Home() {
  return (
    <Button>
      <span>Hello World</span>
    </Button>
  )
}

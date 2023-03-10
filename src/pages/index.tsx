import { styled } from '../styles'

const Button = styled('button', {
  backgroundColor: '$green300',
  borderRadius: 6,

  span: {
    fontWeight: 700,
    color: 'red',
  },

  '&:hover': {
    span: {
      color: '$white',
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

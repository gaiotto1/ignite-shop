import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import logoImg from '../assets/logo.svg';
import { Container, Header } from '../styles/pages/app';
import Image from 'next/image';

export default function App({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <Container>
      <Header>
        <Image width={130} height={52} src={logoImg.src} alt="Logo" />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}

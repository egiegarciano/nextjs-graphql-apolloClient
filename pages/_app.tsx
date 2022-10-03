import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'

import client from '../src/lib/apolloClient'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import Cookies from 'js-cookie'

const accessToken = Cookies.get('accessToken')

const link = new HttpLink({
  uri: 'http://localhost:11000/graphql',
  credentials: 'same-origin',
  headers: { Authorization: accessToken ? `Bearer ${accessToken}` : '' },
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export default client

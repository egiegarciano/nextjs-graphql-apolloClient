import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { offsetLimitPagination } from '@apollo/client/utilities'
import { createUploadLink } from 'apollo-upload-client'
import Cookies from 'js-cookie'

const accessToken = Cookies.get('accessToken')

const link = new HttpLink({
  uri: 'http://localhost:11000/graphql',
  credentials: 'same-origin',
  headers: { Authorization: accessToken ? `Bearer ${accessToken}` : '' },
})

const httpLink = createUploadLink({
  uri: 'http://localhost:11000/graphql',
  credentials: 'same-origin',
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
    'Apollo-Require-Preflight': 'true',
  },
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default client

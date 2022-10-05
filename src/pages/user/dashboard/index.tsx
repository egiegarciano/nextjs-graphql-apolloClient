import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useMutation } from '@apollo/client'
import { LogoutDocument } from '../../../graphql/generated/graphqlOperations'

import decodeToken from '../../../lib/utlis/decodeToken'

const Dashboard: NextPage = () => {
  const accessToken = Cookies.get('accessToken')
  const router = useRouter()

  const owner = decodeToken(accessToken!)

  const [logout, { loading }] = useMutation(LogoutDocument)

  return (
    <div>
      <div>Welcome to dashboard</div>
      <button
        className='mt-6 bg-orange-400 p-4'
        onClick={() =>
          logout({ variables: { input: { username: owner?.username } } })
            .then(() => {
              Cookies.remove('accessToken')
              router.push('/login')
            })
            .catch((err) => {
              console.error(err.message)
              Cookies.remove('accessToken')
              router.push('/login')
            })
        }
      >
        Logout
      </button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

export default Dashboard

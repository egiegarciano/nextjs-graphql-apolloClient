import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useMutation, useQuery } from '@apollo/client'

import decodeToken from '../../../lib/utlis/decodeToken'
import {
  LogoutDocument,
  GetCurrentUserDocument,
} from '../../../graphql/generated/graphqlOperations'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const accessToken = Cookies.get('accessToken')
  const owner = decodeToken(accessToken ?? '')

  const [logout, { loading, error }] = useMutation(LogoutDocument)
  // const {
  //   data: me,
  //   loading: meLoading,
  //   error: meError,
  //   refetch: meRefetch,
  // } = useQuery(GetCurrentUserDocument)

  // try {
  //   if (me?.me) {
  //     console.log(me, 'getCurrentUser')
  //   }
  // } catch (error) {
  //   console.log(error)
  // }

  // if (loading) return <div className='text-5xl'>Loading...</div>

  let errorMessage: string | undefined

  const submitHandler = async () => {
    try {
      const result = await logout({
        variables: { input: { username: owner?.username } },
      })

      if (result.data?.logout) {
        Cookies.remove('accessToken')
        await router.push('/login')
      }
    } catch (error) {
      console.log(error, 'error')
    }
  }

  return (
    <div>
      {error ? (
        <div>An eror has occured</div>
      ) : (
        <>
          <div>Welcome to dashboard</div>
          <button className='mt-6 bg-orange-400 p-4' onClick={submitHandler}>
            Logout
          </button>
        </>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

export default Dashboard

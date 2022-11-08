import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Cookies from 'js-cookie'

import {
  LogoutDocument,
  GetCurrentUserDocument,
} from '../../../graphql/generated/graphqlOperations'
import { decodeToken } from '../../../lib/utlis/decodeToken'
import { joseJwtVerify } from '../../../lib/utlis/decodeToken'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const accessToken = Cookies.get('accessToken')
  // const owner = decodeToken(accessToken!)

  const [logout] = useMutation(LogoutDocument)
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

  const submitHandler = async () => {
    setLoading(true)

    // kung e click ang logout if error, e logout nalang ditso or e extend ang token expiration
    try {
      const payload = await joseJwtVerify(accessToken!)

      const result = await logout({
        variables: { input: { email: payload?.email as string } },
      })

      if (result.data?.logout) {
        Cookies.remove('accessToken')
        await router.push('/login')
        setLoading(false)
      }
    } catch (error) {
      console.log(error, 'error during logout')
      setLoading(false)
    }
  }

  return (
    <div>
      {loading ? (
        <div className='flex h-screen items-center justify-center'>
          <div className='text-5xl'>Loading...</div>
        </div>
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

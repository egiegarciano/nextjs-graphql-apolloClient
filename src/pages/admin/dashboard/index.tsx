import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useMutation, useQuery } from '@apollo/client'

import { decodeToken } from '../../../lib/utlis/decodeToken'
import { AdminLogoutDocument } from '../../../graphql/generated/graphqlOperations'
import { useState } from 'react'

const AdminDashboard: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const accessToken = Cookies.get('adminAccessToken')
  const admin = decodeToken(accessToken ?? '')

  const [logout] = useMutation(AdminLogoutDocument, { fetchPolicy: 'no-cache' })

  const submitHandler = async () => {
    setLoading(true)

    // kung e click ang logout if error, e logout nalang ditso or e extend ang token expiration
    try {
      const result = await logout({
        variables: { input: { email: admin?.email } },
      })

      if (result.data?.adminLogout) {
        Cookies.remove('adminAccessToken')
        await router.push('/admin/login')
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
          <div>Welcome to Admin Dashboard</div>
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

export default AdminDashboard

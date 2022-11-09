import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { isApolloError, useMutation } from '@apollo/client'

import { ConfirmOwnerEmailDocument } from '../../../../graphql/generated/graphqlOperations'
import { joseJwtVerify } from '../../../../lib/utlis/decodeToken'
import useUserStore from '../../../../zustand/useUserStore'

const EmailConfirmation: NextPage = () => {
  const router = useRouter()
  const confirmationToken = router.query.token as string

  const [loading, setLoading] = useState(false)
  const [confirmEmail] = useMutation(ConfirmOwnerEmailDocument)
  const registerInfo = useUserStore((state) => state.registerInfo)
  console.log('registerInfo', registerInfo)

  const onClick = async () => {
    setLoading(true)

    const payload = await joseJwtVerify(confirmationToken)

    try {
      const { data: results } = await confirmEmail({
        variables: { email: payload?.email as string },
      })

      if (results?.confirmOwnerEmail) {
        await router.push('/login')
        setLoading(false)
      }
    } catch (error) {
      console.log('error while confirming email', error)
      setLoading(false)
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      {loading ? (
        <div className='text-5xl'>Loading...</div>
      ) : (
        <div className='w-[300px] rounded-sm bg-green-300 p-6'>
          <button
            className='rounded-sm bg-green-600 p-3 text-white active:bg-green-500'
            onClick={onClick}
          >
            Confirm Email
          </button>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

export default EmailConfirmation

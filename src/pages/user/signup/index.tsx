import { useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'

import { CreateOwnerDocument } from '../../../graphql/generated/graphqlOperations'

const SignUp: NextPage = () => {
  const router = useRouter()
  const [createOwner, { loading }] = useMutation(CreateOwnerDocument)

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const data = {
      name: event.target.password.value,
      username: event.target.username.value,
      password: event.target.password.value,
    }
    console.log(data)
    await createOwner({
      variables: { input: data },
    })
    router.push('/')
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='flex w-[500px] flex-col bg-green-200 p-4'
      >
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' required />
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' id='username' required />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' required />
        <button type='submit' className='mt-4 bg-green-600'>
          Submit
        </button>
      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

export default SignUp

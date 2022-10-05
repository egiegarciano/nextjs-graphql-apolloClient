import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import Cookies from 'js-cookie'

import { LoginDocument } from '../../../graphql/generated/graphqlOperations'

const Login: NextPage = () => {
  const router = useRouter()
  const [login, { loading }] = useMutation(LoginDocument)

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    await login({
      variables: { input: data },
      onCompleted: (data) =>
        Cookies.set('accessToken', data.login.access_token),
    })

    if (loading) <div>Loading...</div>

    router.push('/dashboard')
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='flex w-[500px] flex-col bg-green-200 p-4'
      >
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

export default Login

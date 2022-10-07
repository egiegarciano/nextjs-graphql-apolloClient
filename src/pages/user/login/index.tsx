import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { isApolloError, useMutation } from '@apollo/client'
import { useForm, SubmitHandler } from 'react-hook-form'
import Cookies from 'js-cookie'

import { LoginDocument } from '../../../graphql/generated/graphqlOperations'
import { useState } from 'react'

type Inputs = {
  username: string
  password: string
}

const Login: NextPage = () => {
  const router = useRouter()
  const [login, { error: loginError }] = useMutation(LoginDocument)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({ username, password }) => {
    setLoading(true)

    try {
      const { data: result } = await login({
        variables: { input: { username, password } },
      })

      if (result?.login) {
        Cookies.set('accessToken', result.login.access_token)
        await router.push('/dashboard')
        setLoading(false)
      }
    } catch (error: any) {
      if (isApolloError(error)) {
        error.graphQLErrors.forEach(({ extensions }) => {
          if ((extensions.exception as any).response.sampleErrors) {
            ;(extensions.exception as any).response.sampleErrors.forEach(
              (fieldError: any) => {
                setError(fieldError.property, { message: fieldError.message })
              }
            )
          }
          // Handle here the 'Credentials are not valid' error
          // Also handle the BAD_USER_INPUT error
        })
      }

      setLoading(false)
      console.log(error, 'error in login')
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      {loading ? (
        <div className='text-5xl'>Loading...</div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-[500px] flex-col bg-green-200 p-4'
        >
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            {...register('username', {
              required: 'Username is required.',
              onBlur: (e) => console.log(e),
            })}
            id='username'
          />
          {errors.username && <p>{errors.username.message}</p>}

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            {...register('password', { required: 'Password is required' })}
            id='password'
          />
          {errors.password && <p>{errors.password?.message}</p>}
          <button type='submit' className='mt-4 bg-green-600'>
            Submit
          </button>
        </form>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

export default Login

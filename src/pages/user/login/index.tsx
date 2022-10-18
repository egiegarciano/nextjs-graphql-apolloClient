import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import { isApolloError, useMutation } from '@apollo/client'
import { useForm, SubmitHandler } from 'react-hook-form'
import Cookies from 'js-cookie'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { LoginDocument } from '../../../graphql/generated/graphqlOperations'
import { parsedErrors } from '../../../lib/utlis/parsedErrors'

type Inputs = {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup.string().email().required().trim(),
    password: yup.string().required().trim(),
  })
  .required()

const Login: NextPage = () => {
  const router = useRouter()
  const [login] = useMutation(LoginDocument)
  const [loading, setLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>({ mode: 'onChange', resolver: yupResolver(schema) })

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    setLoading(true)

    try {
      const { data: result } = await login({
        variables: { input: { email, password } },
      })

      if (result?.login) {
        Cookies.set('accessToken', result.login.access_token)
        await router.push('/dashboard')
        setLoading(false)
      }
    } catch (error: any) {
      if (isApolloError(error)) {
        // Todo: parsed error comming from class-validator
        const setErrors = parsedErrors(error)
        setError(setErrors.property, setErrors.errorMessage)
        setGeneralError(setErrors.errorMessage.message)
      }

      setLoading(false)
      console.log('error in login', error)
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      {loading ? (
        <div className='text-5xl'>Loading...</div>
      ) : (
        <div className='flex flex-col'>
          {generalError && <div>{generalError}</div>}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex w-[500px] flex-col bg-green-200 p-4'
          >
            <label htmlFor='email'>Email</label>
            <input type='text' {...register('email')} id='email' />
            {errors.email && <p>{errors.email.message}</p>}

            <label htmlFor='password'>Password</label>
            <input type='password' {...register('password')} id='password' />
            {errors.password && <p>{errors.password?.message}</p>}
            <button type='submit' className='mt-4 bg-green-600'>
              Submit
            </button>
          </form>
          <div className='mt-6 text-center'>
            Sign Up{' '}
            <Link href='/signup'>
              <span className='cursor-pointer text-blue-600'>here</span>
            </Link>
          </div>
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

export default Login

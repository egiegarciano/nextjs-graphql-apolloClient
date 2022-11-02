import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import { isApolloError, useMutation } from '@apollo/client'
import { useForm, SubmitHandler } from 'react-hook-form'
import Cookies from 'js-cookie'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AdminLoginDocument } from '../../../graphql/generated/graphqlOperations'
import { parsedErrors } from '../../../lib/utlis/parsedErrors'

type Inputs = {
  email: string
  password: string
}

const schema = yup
  .object({
    // email: yup.string().email().required().trim(),
    // password: yup.string().required().trim(),
  })
  .required()

const AdminLogin: NextPage = () => {
  const router = useRouter()
  const [login] = useMutation(AdminLoginDocument, { fetchPolicy: 'no-cache' })
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

      if (result?.adminLogin) {
        Cookies.set('adminAccessToken', result.adminLogin.access_token!)
        await router.push('/admin/dashboard')
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
          <div className='text-lg'>Admin</div>
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

export default AdminLogin

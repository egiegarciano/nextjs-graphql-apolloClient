import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import { isApolloError, useMutation } from '@apollo/client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { SignupDocument } from '../../../graphql/generated/graphqlOperations'
import { parsedClassValidatorErrors } from '../../../lib/utlis/parsedClassValidatorErrors'
import useUserStore from '../../../zustand/useUserStore'

type Inputs = {
  name: string
  email: string
  password: string
}

const schema = yup
  .object({
    name: yup
      .string()
      .required('this is a custom message and this field is required')
      .trim(),
    email: yup.string().email().required().trim(),
    password: yup.string().min(8).required().trim(),
  })
  .required()

const SignUp: NextPage = () => {
  const router = useRouter()
  const [createOwner] = useMutation(SignupDocument)
  const [loading, setLoading] = useState(false)
  const addRegisterInfo = useUserStore((state) => state.addRegisterInfo)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>({ resolver: yupResolver(schema), mode: 'onChange' })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)

    addRegisterInfo(data)

    const input = {
      name: data.name,
      email: data.email,
      password: data.password,
    }

    // Todo: create user after confirming email
    try {
      const { data: results } = await createOwner({
        variables: { input },
      })

      if (results?.signup) {
        await router.push('/login')
        setLoading(false)
      }
    } catch (error: any) {
      if (isApolloError(error)) {
        const setErrors = parsedClassValidatorErrors(error)
        if (setErrors) {
          setErrors.forEach((fieldError: any) => {
            setError(fieldError.property, { message: fieldError.message })
          })
        }
      }

      setLoading(false)
      console.log(error, 'error in signup')
      console.log('isApolloError(error))', isApolloError(error))
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      {loading ? (
        <div className='text-5xl'>Loading...</div>
      ) : (
        <div className='flex flex-col'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex w-[500px] flex-col bg-green-200 p-4'
          >
            <label htmlFor='name'>Name</label>
            <input type='text' {...register('name')} id='name' />
            {errors.name && <p>{errors.name.message}</p>}
            <label htmlFor='email'>Email</label>
            <input type='text' {...register('email')} id='email' />
            {errors.email && <p>{errors.email.message}</p>}
            <label htmlFor='password'>Password</label>
            <input type='password' {...register('password')} id='password' />
            {errors.password && <p>{errors.password.message}</p>}
            <button type='submit' className='mt-4 bg-green-600'>
              Submit
            </button>
          </form>
          <div className='mt-6 text-center'>
            Already have an account?{' '}
            <Link href='/login'>
              <span className='cursor-pointer text-blue-600'>Login here.</span>
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

export default SignUp

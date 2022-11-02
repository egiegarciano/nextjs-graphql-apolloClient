import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { isApolloError, useMutation } from '@apollo/client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { CreatePetDocument } from '../../../graphql/generated/graphqlOperations'
import { parsedErrors } from '../../../lib/utlis/parsedErrors'

type Inputs = {
  name: string
  type: string
  image: string
}

const schema = yup.object().shape({
  name: yup.string().required().trim(),
  type: yup.string().required().trim(),
  image: yup
    .mixed()
    .required('Image is required')
    .test('fileSize', 'Image is required', (value) => {
      return value.length !== 0
    }),
})

const AdminCreatePet: NextPage = () => {
  const router = useRouter()
  const [createPet] = useMutation(CreatePetDocument, {
    fetchPolicy: 'no-cache',
  })
  const [loading, setLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
    reset,
  } = useForm<Inputs>({ mode: 'onChange', resolver: yupResolver(schema) })

  const onSubmit: SubmitHandler<Inputs> = async ({ name, type, image }) => {
    setLoading(true)

    console.log('image', image)

    try {
      const { data: result } = await createPet({
        variables: { input: { name, type }, image: image[0] },
      })

      if (result?.createPet) {
        setLoading(false)
      }
    } catch (error: any) {
      // if (isApolloError(error)) {
      //   // Todo: parsed error comming from class-validator
      //   const setErrors = parsedErrors(error)
      //   setError(setErrors.property, setErrors.errorMessage)
      //   setGeneralError(setErrors.errorMessage.message)
      // }

      setLoading(false)
      console.log('error in creating pet', error)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ name: '', type: '' })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <div className='flex h-screen items-center justify-center'>
      {loading ? (
        <div className='text-5xl'>Loading...</div>
      ) : (
        <div className='flex flex-col'>
          {generalError && <div>{generalError}</div>}
          <div className='text-lg'>Create Pet</div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex w-[500px] flex-col bg-green-200 p-4'
          >
            <label htmlFor='name'>Name</label>
            <input type='text' {...register('name')} id='name' />
            {errors.name && <p>{errors.name.message}</p>}

            <label htmlFor='type'>Type</label>
            <input type='text' {...register('type')} id='type' />
            {errors.type && <p>{errors.type?.message}</p>}

            <label htmlFor='image'>Upload Image</label>
            <input type='file' {...register('image')} id='image' />
            {errors.image && <p>{errors.image.message}</p>}

            <button type='submit' className='mt-4 bg-green-600'>
              Submit
            </button>
          </form>

          <Link href='/admin/pet-list'>
            <a className='text-blue-900'>Lists of pet here</a>
          </Link>
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

export default AdminCreatePet

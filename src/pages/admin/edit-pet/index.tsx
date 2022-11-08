import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, ChangeEvent } from 'react'
import { isApolloError, useMutation, useQuery } from '@apollo/client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { UpdatePetInfoDocument } from '../../../graphql/generated/graphqlOperations'
import { GetOnePetDocument } from '../../../graphql/generated/graphqlOperations'
import { parsedErrors } from '../../../lib/utlis/parsedErrors'

type Inputs = {
  name: string
  type: string
  image: string
}

const schema = yup.object().shape({
  name: yup.string().required().trim(),
  type: yup.string().required().trim(),
  // image: yup
  //   .mixed()
  //   .required('Image is required')
  //   .test('fileSize', 'Image is required', (value) => {
  //     return value.length !== 0
  //   }),
})

const AdminCreatePet: NextPage = () => {
  const router = useRouter()
  const petId = router.query.id as string
  const [updatePetInfo] = useMutation(UpdatePetInfoDocument, {
    fetchPolicy: 'no-cache',
  })
  const { data, loading: getPetLoading } = useQuery(GetOnePetDocument, {
    variables: { id: parseInt(petId) },
  })
  const [loading, setLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
    reset,
  } = useForm<Inputs>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = async ({ image, name, type }) => {
    setLoading(true)

    try {
      const { data: result } = await updatePetInfo({
        variables: {
          input: { id: parseInt(petId), name, type },
          newImage: image[0],
        },
      })

      if (result?.updatePetInfo) {
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

  const [previewImage, setpreviewImage] = useState('')

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      // setpreviewImage(URL.createObjectURL(e.target.files?.[0] as any))
      const reader = new FileReader()
      reader.onloadend = () => {
        setpreviewImage(reader.result as string)
      }
      reader.readAsDataURL(e.target.files?.[0])
    } else {
      setpreviewImage('')
      // URL.revokeObjectURL(previewImage)
    }
  }

  console.log('previewImage', previewImage)

  return (
    <div className='flex h-screen items-center justify-center'>
      {loading || getPetLoading ? (
        <div className='text-5xl'>Loading...</div>
      ) : (
        <div className='flex flex-col'>
          {generalError && <div>{generalError}</div>}
          <div className='text-lg'>Edit pet info</div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex w-[500px] flex-col bg-green-200 p-4'
          >
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              {...register('name')}
              id='name'
              defaultValue={data?.getPet.name}
            />
            {errors.name && <p>{errors.name.message}</p>}

            <label htmlFor='type'>Type</label>
            <input
              type='text'
              {...register('type')}
              id='type'
              defaultValue={data?.getPet.type!}
            />
            {errors.type && <p>{errors.type?.message}</p>}

            <label htmlFor='image'>Update Image</label>
            <input
              type='file'
              {...(register('image'),
              {
                onChange: onFileChange,
              })}
              id='image'
            />
            {errors.image && <p>{errors.image.message}</p>}

            <button type='submit' className='mt-4 bg-green-600'>
              Submit
            </button>
          </form>
          {previewImage && (
            // You can use blob both preview link and image but cannot use file reader with link image
            // <a target='_blank' rel='noopener noreferrer' href={previewImage}>
            //   Preview Image
            // </a>
            <Image src={previewImage} alt='dog' width='300' height='300' />
          )}
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

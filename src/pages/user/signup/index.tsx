import { useState } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'

import { CreateOwnerDocument } from '../../../graphql/generated/graphqlOperations'

const SignUp: NextPage = () => {
  const router = useRouter()

  const [createOwner, { loading }] = useMutation(CreateOwnerDocument)
  const [nameInput, setNameInput] = useState('')

  // console.log(nameInput, 'nameInput')

  return (
    <div className='mx-auto flex w-40 flex-col'>
      <label htmlFor='nameInput'>Enter Name</label>
      <input
        name='nameInput'
        type='text'
        className='border-2 border-black'
        onChange={(e) => setNameInput(e.target.value)}
      />
      <button
        type='submit'
        onClick={() =>
          createOwner({ variables: { input: { name: nameInput } } }).then(
            () => {
              loading ? <div>Loading....</div> : router.push('/')
            }
          )
        }
        className='mt-2 bg-orange-300 p-2'
      >
        Submit
      </button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

export default SignUp

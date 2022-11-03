import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { AdminPetListDocument } from '../../../graphql/generated/graphqlOperations'

const baseUrl = 'http://localhost:11000/'

const AdminPetList: NextPage = () => {
  const { data, error, loading, refetch } = useQuery(AdminPetListDocument)

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div>
      {loading ? (
        <div className='flex h-screen items-center justify-center'>
          <div className='text-5xl'>Loading...</div>
        </div>
      ) : (
        <>
          <div>Lists of pets</div>
          <Link href='/admin/create-pet'>
            <a className='text-blue-900'>Create pet here</a>
          </Link>

          {!data?.pets ? (
            <div>No pets found</div>
          ) : (
            data?.pets.map((data) => (
              <div key={data.id}>
                <Link href={`/admin/pet-list/${data.id}`}>
                  <a className='text-red-800'>{data.name}</a>
                </Link>
                <Image
                  src={`${baseUrl}${
                    !data.image ? 'no-image-placeholder.png' : data.image
                  }`}
                  alt={data.name}
                  width='300'
                  height='300'
                />
              </div>
            ))
          )}
        </>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

export default AdminPetList

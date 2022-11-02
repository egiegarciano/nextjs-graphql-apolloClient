import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { NetworkStatus, useQuery } from '@apollo/client'
import { useForm, SubmitHandler } from 'react-hook-form'

import { OwnerPaginateDocument } from '../../../graphql/generated/graphqlOperations'
import Pagination from '../../../components/organisms/Pagination'

const UserList: NextPage = () => {
  const [filterInput, setFilterInput] = useState<string | null>(null)

  const { data, error, refetch, loading, networkStatus } = useQuery(
    OwnerPaginateDocument
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        !loading && (await refetch({ page: 1, email: filterInput }))
      } catch (error) {
        console.log('error in filter', error)
      }
    }

    fetchData()
  }, [filterInput, refetch, loading])

  const onPageChange = async (e: any) => {
    try {
      await refetch({ page: e.selected + 1 })
    } catch (error) {
      console.log(error)
    }
  }

  enum filterLimitPerPage {
    TEN = 10,
    TWENTY = 20,
    THIRTY = 30,
  }

  const [selected, setSelected] = useState('')

  return (
    <div className='mt-10 flex h-screen justify-center'>
      <div className='flex w-[400px] flex-col'>
        <input
          type='text'
          className='border border-black'
          onChange={(e) => setFilterInput(e.target.value)}
        />
        <select
          name='filterPerPageLimit'
          onChange={async (e) =>
            await refetch({ limit: parseInt(e.target.value) })
          }
        >
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </select>
        <div className='text-lg'>List of Users</div>
        {loading ? (
          <div className='text-5xl'>Loading...</div>
        ) : (
          <>
            {data?.ownerPaginate.items.length ? (
              <div>
                {data.ownerPaginate.items.map((item) => (
                  <div key={item.id} className='flex'>
                    <div>{item.id}</div>
                    <div>{item.name}</div>
                    <div>{item.email}</div>
                  </div>
                ))}
                <Pagination
                  totalPages={data?.ownerPaginate.meta.totalPages!}
                  currentPage={data?.ownerPaginate.meta.currentPage! - 1}
                  onPageChange={onPageChange}
                />
              </div>
            ) : (
              <div className='text-2xl'>No data</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

export default UserList

import type { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { NetworkStatus, useQuery } from '@apollo/client'

import { OwnerPaginateDocument } from '../../../graphql/generated/graphqlOperations'

const UserList: NextPage = () => {
  // const [loading, setLoading] = useState(false)

  const { data, error, refetch, loading, networkStatus } = useQuery(
    OwnerPaginateDocument
  )

  const onPageChange = async (e: any) => {
    await refetch({ page: e.selected + 1 })
    // await fetchMore({ variables: { page: e.selected + 1 } })
  }

  // console.log('networkStatus', networkStatus === NetworkStatus.refetch)

  return (
    <div className='flex h-screen items-center justify-center'>
      {loading ? (
        <div className='text-5xl'>Loading...</div>
      ) : (
        <div className='flex w-[400px] flex-col'>
          <div className='text-lg'>List of Users</div>
          {data &&
            data.ownerPaginate.items.map((item) => (
              <div key={item.id} className='flex'>
                <div>{item.id}</div>
                <div>{item.name}</div>
                <div>{item.email}</div>
              </div>
            ))}
          <ReactPaginate
            containerClassName='flex justify-between items-center border-2 border-blue-900 p-1'
            pageClassName='p-1'
            pageLinkClassName='text-fuchsia-600'
            onPageChange={onPageChange}
            pageCount={data?.ownerPaginate.meta.totalPages!}
            pageRangeDisplayed={3}
            forcePage={data?.ownerPaginate.meta.currentPage! - 1}
            previousLabel='<<Previous'
            previousClassName='border-2 border-yellow-900 p-1'
            previousLinkClassName='text-green-900'
            nextLabel='Next>>'
            nextClassName='border-2 border-purple-900 p-1'
            nextLinkClassName='text-orange-700'
            breakLabel='......'
            breakClassName='border-2 border-black'
            activeClassName='border-2 border-red-900'
            activeLinkClassName='text-black'
          />
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

export default UserList

import React from 'react'
import ReactPaginate from 'react-paginate'

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (e: any) => Promise<void>
}

const Pagination = (props: Props) => {
  const { currentPage, onPageChange, totalPages } = props

  return (
    <ReactPaginate
      containerClassName='flex justify-between items-center border-2 border-blue-900 p-1'
      pageClassName='p-1'
      pageLinkClassName='text-fuchsia-600'
      onPageChange={onPageChange}
      pageCount={totalPages}
      pageRangeDisplayed={3}
      forcePage={currentPage}
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
  )
}

export default Pagination

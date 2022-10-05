import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className='bg-black text-white'>
      <div>Home Page (pending)</div>
      <Link href='/login'>
        <button className='mt-6 bg-orange-400 p-4'>Login</button>
      </Link>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

export default Home

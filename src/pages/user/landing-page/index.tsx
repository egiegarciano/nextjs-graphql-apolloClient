import type { GetServerSideProps, NextPage } from 'next'

const Home: NextPage = () => {
  return <div className='bg-black text-white'>Home Page (pending)</div>
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

export default Home

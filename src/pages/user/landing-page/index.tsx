import type { GetServerSideProps, NextPage } from 'next'
import Cookies from 'js-cookie'
import decodeToken from '../../../lib/utlis/decodeToken'

const Home: NextPage = () => {
  const token = Cookies.get('accessToken')!

  const decodedToken = decodeToken(token)

  console.log(decodedToken, 'decodedToken')

  return (
    <div className='bg-black text-white'>
      Home Page (pending)
      <button className='mt-6 bg-orange-400 p-4'>Logout</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

export default Home

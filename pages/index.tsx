import { Inter } from '@next/font/google'
import Header from '@/components/global/header'
import Footer from '@/components/global/footer'
import MainPage from '@/components/main/MainPage'
import Protected from '@/components/global/Protected'
import { useEffect, useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {user} = useContext(AuthContext);
  useEffect(()=>{
    console.log(user, 'I am USERUSER');
  }, []);
  return (
    <div className='bg-[white] font-body'>
      <Header />
      <MainPage />
      <Footer />
    </div>
  )
}

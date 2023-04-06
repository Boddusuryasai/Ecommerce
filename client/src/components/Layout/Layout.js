import React from 'react'
import Header from './Header'
import Footer from './Footer'
import toast, { Toaster } from 'react-hot-toast';
const Layout = (props) => {
  return (
    <div>
        <Header/>
        <main className='min-h-[75vh]'>
           <Toaster/>
        {props.children}
        </main>
        <Footer/>
        
    </div>
  )
}

export default Layout
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import toast, { Toaster } from 'react-hot-toast';
const Layout = (props) => {
  return (
    <div className="container mx-auto" >
        <Header/>
        <main className='min-h-[75vh] mt-20'>
           <Toaster/>
        {props.children}
        </main>
        <Footer/>
        
    </div>
  )
}

export default Layout
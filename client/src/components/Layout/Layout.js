import React from 'react'
import Header from './Header'
import Footer from './Footer'
const Layout = (props) => {
  return (
    <div>
        <Header/>
        <main className='h-[80vh]'>
        {props.children}
        </main>
        <Footer/>
        
    </div>
  )
}

export default Layout
import React from 'react'
import Layout from '../components/Layout/Layout'
const About = () => {
  return (
    <Layout>
      <div className=" w-full md:min-h-[75vh] flex flex-col  justify-center items-center">
        <h1 className="md:text-8xl text-5xl font-extrabold tracking-tight sm:text-center  bg-gradient-to-r from-blue-700 to-cyan-400 bg-clip-text text-transparent">
          Shop Hunt
        </h1>
        <p className="mt-6 px-2 md:text-lg  text-gray-600 text-md sm:text-center">
          Shop Hunt is the ultimate ecommerce app for all your shopping needs.
          With a wide range of products from top brands, intuitive search
          function, and convenient payment options, shopping has never been
          easier. Fast and reliable shipping, easy returns, and 24/7 customer
          support ensure a seamless shopping experience.
        </p>
      </div>
    </Layout>
  )
}

export default About
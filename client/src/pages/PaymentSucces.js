import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useSearchParams } from 'react-router-dom'
import { clearCart } from '../redux/cartSlice'
import { useDispatch } from 'react-redux'
const PaymentSuccess = () => {
    const seachQuery = useSearchParams()[0]
    const referenceNum = seachQuery.get("reference")
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(clearCart())
    },[])
    return (
        <Layout>
            <div className='flex justify-center items-center flex-col h-[75vh]'>

                <h1 className='text-4xl'> Order Successfull</h1>

               <h3> Reference No.{referenceNum}</h3>
                   
               </div>

            </Layout>
        
    )
}

export default PaymentSuccess
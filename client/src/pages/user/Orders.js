import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { BASE_URL } from "../../constants";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/auth/orders`);
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
  
  <div className="flex flex-col w-full">
    <h2 className="font-medium text-3xl dark:text-white">All Orders Details</h2>
  {orders.map((o,i)=>{
    return (<div key={o._id} className="max-w-6xl px-4 mx-auto my-4 md:my-6 flex-grow-0 flex-shrink-0 w-full">
    <div className="mt-8 md:flex-row flex flex-col border border-gray-300 rounded-lg overflow-hidden">
      <div className="md:max-w-xs w-full border-r border-gray-300 bg-gray-100 dark:border-gray-300 dark:bg-gray-800">
        <div className="p-8">
          <div className="grid md:grid-cols-1 ">
            {[
              ["Order ID", o?.payment?.id],
              ["Date", o?.createdAt],
              ["Total Amount", o?.payment?.amount/100],
              ["Order Status", o?.status],
              ["Payment Status", o?.payment?.status==="created"?"Failed":"Success"],
            ].map(([key, value]) => (
              <div key={key} className="mb-4">
                <div className="text-sm text-gray-500 dark:text-white">
                  {key}
                </div>
                <div className="text-sm font-medium dark:text-gray-400">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 dark:bg-gray-600">
        <div className="p-8">
          <ul className="divide-y divide-gray-200 dark:divide-gray-500 -my-7">
            {o?.products?.map((product) => (
              <li
                key={product._id}
                className="flex items-stretch flex-wrap justify-between space-x-5 py-7"
              >
                <div className="flex items-stretch flex-1 ">
                  <div className="flex-shrink-0">
                    <img
                      className="w-20 h-20 border border-gray-200 rounded-lg object-contain"
                      src={`${BASE_URL}/api/v1/product/product-photo/${product.productId._id}`}
                      alt={product.productId.name}
                    />
                  </div>

                  <div className="flex flex-col justify-between ml-5">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {product.productId.name} <span>.. {product.productId.price} $</span>
                      </p>
                      <p className="mt-1.5 text-sm font-medium text-gray-500 dark:text-gray-300">
                        {product.productId.description?.substring(0, 30)}
                      </p>
                    </div>

                    <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                      x {product.count}
                    </p>
                  </div>
                </div>

                {/* <div className="flex flex-col items-end justify-between ml-auto">
                  <p className="text-sm font-bold text-right text-gray-900 dark:text-white">
                    {product.price}
                  </p>
                </div> */}
              </li>
            ))}
          </ul>
          <hr className="my-8 border-t border-t-gray-200 dark:border-gray-500" />
         
        </div>
      </div>
    </div>
  </div>)
  })}
  </div>
  
  )
        }

export default Orders
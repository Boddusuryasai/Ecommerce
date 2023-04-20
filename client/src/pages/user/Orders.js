import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
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
  //   <div className="flex justify-center items-center w-full">
  //     <div className="grid grid-cols-12">
  //       <div className="col-span-12 lg:col-span-9">
  //         <h1 className="text-center text-3xl font-bold ">All Orders</h1>
  //         {orders?.map((o, i) => {
  //           return (
  //             <div className="border shadow rounded-lg" key={o._id}>
  //               <table className="table-auto w-full">
  //                 <thead>
  //                   <tr>
  //                     <th className="px-4 py-2">#</th>
  //                     <th className="px-4 py-2">Status</th>
  //                     <th className="px-4 py-2">Buyer</th>
  //                     <th className="px-4 py-2">Date</th>
  //                     <th className="px-4 py-2">Payment</th>
  //                     <th className="px-4 py-2">Quantity</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   <tr>
  //                     <td className="border px-4 py-2">{i + 1}</td>
  //                     <td className="border px-4 py-2">{o?.status}</td>
  //                     <td className="border px-4 py-2">{o?.buyer?.name}</td>
  //                     <td className="border px-4 py-2">{moment(o?.createAt).fromNow()}</td>
  //                     <td className="border px-4 py-2">{o?.payment.success ? "Success" : "Failed"}</td>
  //                     <td className="border px-4 py-2">{o?.products?.length}</td>
  //                   </tr>
  //                 </tbody>
  //               </table>
  //               <div className="container mx-auto px-4">
  //                 {o?.products?.map((p, i) => (
  //                   <div className="flex flex-wrap mb-2 p-3 card rounded-lg" key={p._id}>
  //                     <div className="w-full md:w-4/12">
  //                       <img
  //                         src={`/api/v1/product/product-photo/${p._id}`}
  //                         className="card-img-top object-cover object-center rounded-lg h-56 w-full"
  //                         alt={p.name}
  //                       />
  //                     </div>
  //                     <div className="w-full md:w-8/12 px-4">
  //                       <p className="text-lg font-bold mb-2">{p.name}</p>
  //                       <p className="text-sm mb-2">{p.description.substring(0, 30)}</p>
  //                       <p className="text-xl font-bold mb-2">Price : {p.price}</p>
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //  </div>
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
                key={product.id}
                className="flex items-stretch flex-wrap justify-between space-x-5 py-7"
              >
                <div className="flex items-stretch flex-1 ">
                  <div className="flex-shrink-0">
                    <img
                      className="w-20 h-20 border border-gray-200 rounded-lg object-contain"
                      src={`/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                    />
                  </div>

                  <div className="flex flex-col justify-between ml-5">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {product.name} <span>.. {product.price} $</span>
                      </p>
                      <p className="mt-1.5 text-sm font-medium text-gray-500 dark:text-gray-300">
                        {product.description.substring(0, 30)}
                      </p>
                    </div>

                    <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                      x {o?.products?.length}
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
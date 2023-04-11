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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <div className="flex justify-center items-center w-full">
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-9">
          <h1 className="text-center text-3xl font-bold ">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow rounded-lg" key={o._id}>
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">#</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Buyer</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Payment</th>
                      <th className="px-4 py-2">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">{i + 1}</td>
                      <td className="border px-4 py-2">{o?.status}</td>
                      <td className="border px-4 py-2">{o?.buyer?.name}</td>
                      <td className="border px-4 py-2">{moment(o?.createAt).fromNow()}</td>
                      <td className="border px-4 py-2">{o?.payment.success ? "Success" : "Failed"}</td>
                      <td className="border px-4 py-2">{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container mx-auto px-4">
                  {o?.products?.map((p, i) => (
                    <div className="flex flex-wrap mb-2 p-3 card rounded-lg" key={p._id}>
                      <div className="w-full md:w-4/12">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top object-cover object-center rounded-lg h-56 w-full"
                          alt={p.name}
                        />
                      </div>
                      <div className="w-full md:w-8/12 px-4">
                        <p className="text-lg font-bold mb-2">{p.name}</p>
                        <p className="text-sm mb-2">{p.description.substring(0, 30)}</p>
                        <p className="text-xl font-bold mb-2">Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
   </div>
  )
        }

export default Orders
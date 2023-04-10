
import Layout from '../components/Layout/Layout'
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { Button } from '@material-tailwind/react';
const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            console.log(error);
        }
    };
    //detele item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };
    const checkoutHandler = async () => {

       try {
        const { data: { key } } = await axios.get("/api/v1/getkey")
   
        const { data: { order } } = await axios.post("/api/v1/product/checkout", {
            cart
        })
        var options = {
            "key": key, // Enter the Key ID generated from the Dashboard
            "amount": order.payment.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Surya Sai",
            "description": "Test Transaction",
            "image": "https://res.cloudinary.com/dybiiddob/image/upload/v1679133176/dmu60twd28ljdwb3szu7.jpg",
            "order_id": order.payment.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `http://localhost:4000/api/v1/product/paymentverification/${order._id}`,
            "prefill": {
                "name": auth?.user?.name,
                "email": auth?.user?.email,
                "contact": auth?.user?.phone
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open()
        
       } catch (error) {
         console.log(error);
       }
    }

    return (
        <Layout>
            <div className="mt-8 mx-auto max-w-2xl">
                <h3 className='text-center my-4 text-gray-500'>{`You have ${cart?.length} items in your cart `}</h3>
                <div className="mx-auto max-w-2xl">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cart?.map((product) => (
                            <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src={`/api/v1/product/product-photo/${product._id}`}
                                        alt={"product.imageAlt"}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                {product.name}
                                            </h3>
                                            <p className="ml-4">${product.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">


                                        <div className="flex">
                                            <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                onClick={() => removeCartItem(product._id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="border-t border-gray-200  mt-4 py-6  ">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{totalPrice()}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        {auth?.token ?<Button
                          onClick={checkoutHandler}
                          className="flex items-center justify-center rounded-md border border-transparent bg-blue-400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Button>:<Button
                          onClick={navigate("/login")}
                          className="flex items-center justify-center rounded-md border border-transparent bg-blue-400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Login to checkout
                        </Button>}
                        
                      </div>
                      </div>
                   </div>
           
        </Layout>


    )
}

export default CartPage
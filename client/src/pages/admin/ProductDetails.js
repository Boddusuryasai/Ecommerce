import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
const ProductDetails = () => {
  const dispatch = useDispatch() 
  const handleAdd=(item)=>{
    dispatch(addItem(item))
  }
  const params = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="m-10 mx-auto max-w-screen-lg  rounded-xl border shadow-lg md:pl-8">
        <div className="flex flex-col  bg-white sm:flex-row md:min-h-80">
          <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
            <h2 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-4xl">{product.name}</h2>
            <p className="mt-2 text-lg">$ {product.price}</p>
            <p className="mt-4 mb-8 max-w-md text-gray-500">{product.description}</p>
            <Button onClick={
              (event) => {
                event.preventDefault();
                handleAdd(product)
                toast.success("Item added to cart")
              }
            }
              className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md  px-6 py-2 text-white">
              <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold"> Add to cart </span>

            </Button>
          </div>

          <div className="order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
            {product._id &&

              <img className="h-full w-full object-cover" src={`${BASE_URL}/api/v1/product/product-photo/${product._id}`} loading="lazy" />
            }
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default ProductDetails
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
<div class="m-10 mx-auto max-w-screen-lg  rounded-xl border shadow-lg md:pl-8">
  <div class="flex flex-col  bg-white sm:flex-row md:min-h-80">
    <div class="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
      <h2 class="text-xl font-bold text-gray-900 md:text-2xl lg:text-4xl">{product.name}</h2>
      <p class="mt-2 text-lg">$ {product.price}</p>
      <p class="mt-4 mb-8 max-w-md text-gray-500">{product.description}</p>
      <Button  class="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white">
        <span class="group flex w-full items-center justify-center rounded py-1 text-center font-bold"> Add to cart </span>
        
      </Button>
    </div>

    <div class="order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
     { product._id &&

     <img class="h-full w-full object-cover" src={`/api/v1/product/product-photo/${product._id}`} loading="lazy" />
     }
     </div>
  </div>
</div>

    </Layout>
  )
}

export default ProductDetails
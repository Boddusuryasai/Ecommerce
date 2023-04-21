import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams} from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../constants"
import ProductCard from "./ProductCard";
const CategoryPage = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

    
  return (
    <Layout>
       <div className="flex flex-wrap justify-center">
            {products.length>0 ? (products?.map((p) => (
               <Link to={`/product/${p.slug}`} key={p._id}>
              <ProductCard product={p}/>
              </Link>
            ))):(<div>Loading...</div>)}
          </div>
    </Layout>
  )
}

export default CategoryPage
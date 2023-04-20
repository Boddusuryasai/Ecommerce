import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../constants"
const CategoryPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

    
  return (
    <Layout>
       <div className="flex flex-wrap justify-center">
            {products.length>0 ? (products?.map((p) => (
               <Link to={`/product/${p.slug}`} key={p._id}>
              <div className="card m-2 p-2 border-2 rounded-md shadow-lg" style={{ width: "18rem" }}
              key={p._id}>
                <img
                  src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title text-lg font-bold">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text font-bold text-lg">$ {p.price}</p>
                  
                  <div className="text-center">
                  <button className="bg-gray-500 hover:bg-gray-700 text-white  py-1 rounded-md text-sm px-2 mt-2">
                    ADD TO CART
                  </button>
                  </div>
                </div>
              </div>
              </Link>
            ))):(<div>Loading...</div>)}
          </div>
    </Layout>
  )
}

export default CategoryPage
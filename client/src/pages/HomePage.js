import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Checkbox, Radio } from "@material-tailwind/react";
import axios from "axios";
import { Prices } from "../components/Prices";
import { Link } from "react-router-dom";
import { BASE_URL } from "../constants";
import useCategory from "../components/hooks/useCategory.js"
import useProductCount from "../components/hooks/useProductCount.js"
import ProductCard from "./ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all categories
  const {categories } = useCategory()
  //getTotal count
  const { total } = useProductCount();
  //get products
  const getAllProducts = async () => {
    try {
        setLoading(true);
        const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-list/${page}`);
        setLoading(false);
        setProducts(data.products);   
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {

      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
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
      <div className="container mx-auto mt-3 flex flex-col-reverse md:flex-row flex-wrap">
        <div className="w-full md:w-1/5">
          <h4 className="text-center text-lg font-bold mb-4">
            Filter By Category
          </h4>
          <div className="flex flex-col">

            {categories?.map((c) => (
              <Checkbox
                size="md"
                label={c.name}
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              />
            ))}
          </div>
          <h4 className="text-center text-lg font-bold mt-8 mb-4">
            Filter By Price
          </h4>
          <div className="flex flex-col">
            <form onChange={(e) => setRadio(e.target.value.split(","))
            }>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio name="price-filter" value={p.array.join(',')} label={p.name} />
                </div>
              ))}
            </form>
          </div>
          <div className="flex flex-col mt-8">
            <button
              className="bg-orange-500 hover:bg-orange-700 mb-2 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="w-full md:w-4/5">
          <div className="flex flex-wrap justify-center">
            {loading && (<div
              className="flex flex-col justify-center items-center">
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>


            </div>)}
            {!loading && products?.map((p) => (
              <Link to={`/product/${p.slug}`} key={p._id}>
                <ProductCard product={p}/>
              </Link>
            ))}
          </div>
          {!(checked.length || radio.length) &&
            <div className="mt-4 mb-8 text-center">
              {products && products.length < total && (
                <button  onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }} className="inline-flex items-center rounded-md bg-cyan-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-cyan-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
                {loading ? "Loading ..." : "Loadmore"}
              </button>
                
              )}
            </div>
          }
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

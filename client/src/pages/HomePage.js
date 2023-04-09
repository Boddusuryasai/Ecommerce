import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Checkbox, Radio } from "@material-tailwind/react";
import axios from "axios";
import { Prices } from "../components/Prices";
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTotal count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
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
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
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
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
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
        <h1 className="md:text-8xl text-5xl font-extrabold tracking-tight sm:text-center sm:text-9xl bg-gradient-to-r from-blue-700 to-cyan-400 bg-clip-text text-transparent">
          Shop Hunt
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 text-left sm:text-center">
          Shop Hunt is the ultimate ecommerce app for all your shopping needs.
          With a wide range of products from top brands, intuitive search
          function, and convenient payment options, shopping has never been
          easier. Fast and reliable shipping, easy returns, and 24/7 customer
          support ensure a seamless shopping experience.
        </p>
      </div>
      <div className="container mx-auto mt-3 flex flex-wrap">
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
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="w-full md:w-4/5">
          <div className="flex flex-wrap justify-center">
            {products?.map((p) => (
              <div className="card m-2 p-2 border-2 rounded-md shadow-lg" style={{ width: "18rem" }}
              key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title text-lg font-bold">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text font-bold text-lg">$ {p.price}</p>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-2 rounded-full mt-2">
                    More Details
                  </button>
                  <button className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-2 rounded-full mt-2 ml-4">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          { !(checked.length || radio.length) &&
          <div className="mt-4 mb-8 text-center">
            { products && products.length < total  && (
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full text-center"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
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

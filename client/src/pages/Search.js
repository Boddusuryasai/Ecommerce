import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="flex flex-wrap mt-4 justify-center">
           
            {values?.results.map((p) => (
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
        </div>
      </div>
    </Layout>
  );
};

export default Search;
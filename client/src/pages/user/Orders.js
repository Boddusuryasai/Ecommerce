import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";

const Orders = () => {
  return (
    <Layout>
      <div className="container p-3 m-3">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <UserMenu />
          </div>
          <div className="col-span-9">
            <h1 className="text-2xl font-bold mb-4">All Orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

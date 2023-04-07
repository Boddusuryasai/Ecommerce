import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";

const Users = () => {
  return (
    <Layout>
      <div className="container mx-auto px-3 py-3">
        <div className="flex flex-wrap -mx-3">
          <div className="md:w-1/4 px-3">
            <AdminMenu />
          </div>
          <div className="md:w-3/4 px-3">
            <h1 className="text-2xl font-bold">All Users</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;

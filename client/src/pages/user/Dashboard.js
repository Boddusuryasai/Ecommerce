import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container mx-auto m-3 p-3">
        <div className="flex">
          <div className="w-1/4">
            <UserMenu />
          </div>
          <div className="w-3/4">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

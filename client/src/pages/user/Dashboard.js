import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container mx-auto m-3 p-3">
        <div className="flex">
          <div className="w-1/4">
            <UserMenu />
          </div>
          
          <Outlet/>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div >
      <div className="flex flex-col  md:flex-row  my-2  gap-2">
          <div className="w-full md:w-1/4">
            <UserMenu />
          </div>
          
          <Outlet/>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

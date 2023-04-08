import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [auth] = useAuth();
  
  return (
    <Layout>
      <div >
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full md:w-1/4">
            <AdminMenu />
          </div>
          <Outlet/>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

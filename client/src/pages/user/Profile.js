import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";

const Profile = () => {
  return (
    <Layout>
      <div className="container m-3 p-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <UserMenu />
          </div>
          <div className="md:col-span-9">
            <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

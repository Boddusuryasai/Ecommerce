import React from "react";

import { useAuth } from "../../context/auth";
const Profile = () => {
    const [auth] = useAuth();
  return (
    
      <div >
        
      <div className="w-3/4">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </div>
          </div>
      </div>
    
  );
};

export default Profile;

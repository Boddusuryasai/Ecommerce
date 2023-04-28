import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import Spinner from "../../Spinner";
import { BASE_URL } from "../../../constants";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth()
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${BASE_URL}/api/v1/auth/user-auth`);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

 

  return ok ? <Outlet /> : <Spinner/>;
}

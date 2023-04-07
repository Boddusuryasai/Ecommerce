import { useState } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { Link ,useNavigate , useLocation} from "react-router-dom";
  import axios from "axios";
  import toast from 'react-hot-toast';
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
  export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
      const [auth, setAuth] = useAuth();
      const navigate = useNavigate()
    const location = useLocation()
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission
        try {
            const res = await axios.post(`/api/v1/auth/login`, {
              ...formData
            });
            if (res && res.data.success) {
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                    role:res.data.role
                  });
                  localStorage.setItem("auth", JSON.stringify(res.data));
              toast.success(res.data && res.data.message);
              navigate(location.state || "/");
            } else {
              toast.error(res.data.message);
            }
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
          }
        };
    return (
        <Layout>
      <div className="flex justify-center items-center">
        <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to Login.
        </Typography>
        <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
              <div className="mb-4 flex flex-col gap-6">
             
              <Input
                size="lg"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                size="lg"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
             
              
            </div>
            <Button className="mt-6" fullWidth type="submit">
              Login
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Dont have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Register
              </Link>
            </Typography>
          </form>
      </Card>
      </div>
      </Layout>
    );
  }
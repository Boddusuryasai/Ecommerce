import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../constants";

export default function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate()

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  //create product function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");

      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };


  return (
    <div className="md:w-3/4">
      <div className="flex justify-center ">
        <Card color="transparent" shadow={false}>
          <form
            className=" mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-3 flex flex-col gap-3">
              <Input
                size="lg"
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                size="lg"
                label="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <Input
                size="lg"
                type="number"
                label="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <Input
                size="lg"
                type="number"
                label="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
              <Input
                size="lg"
                type="file"
                label="photo"
                name={photo}
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                required
              />
              <Select variant="outlined" label="Select category" onChange={(value) => {
                setCategory(value);
              }}>
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}

              </Select>
              <Select variant="outlined" label="Select Shipping" onChange={(value) => {
                setShipping(value);
              }}>

                <Option value="0">
                  No
                </Option>
                <Option value="1">
                  Yes
                </Option>


              </Select>
            </div>
            <Button className="mt-3" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </div>

  );
}

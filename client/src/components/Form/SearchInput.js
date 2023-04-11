import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  
  Input,
 
  Button,
  
} from "@material-tailwind/react";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center  ">
      
      <div className="relative flex max-w-[24rem]">
      <Input
        type="text"
        label="search products"
        value={values.keyword}
          fullWidth
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          required
        className="pr-20"
        containerProps={{
          className: "min-w-0",
        }}
      />
      <Button
        size="sm"
        color={values ? "blue" : "blue-gray"}
        disabled={!values}
        className="!absolute right-1 top-1 rounded"
      >
        search
      </Button>
    </div>
    </div>
  );
};

export default SearchInput;

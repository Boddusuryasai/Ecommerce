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
      <form className="flex gap-3 w-48" role="search" onSubmit={handleSubmit}>
        <Input
          size="lg"
          label="Search"
          name="Search"
          value={values.keyword}
          fullWidth
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          required
        />
        <Button
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          search
        </Button>
      </form>
    </div>
  );
};

export default SearchInput;

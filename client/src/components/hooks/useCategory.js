import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/category/get-category`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    // Listen for changes in categories state
   // console.log('Categories updated:', categories);
  }, [categories]);

  return { categories, getCategories };
}
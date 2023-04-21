import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants';

export  default function useProductCount(){
    const [total, setTotal] = useState(0);
    useEffect(() => {
      const getProductCount = async () => {
        try {
          const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-count`);
          setTotal(data?.total);
        } catch (error) {
          console.log(error);
        }
      };
  
      getProductCount();
    }, []);
  
    return { total };
  };
  
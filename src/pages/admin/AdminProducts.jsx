import axios from "axios";
import { useEffect, useState } from "react";

const AdminProducts = () => {
  const [products, setproducts] = useState([])
    useEffect(() => {
      // console.log("use effect working....")
      const fetchProductList = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/products`);
          setproducts(response?.data?.data)
        } catch (error) {
          console.log("error", error.message);
        } finally {
          console.log("always");
        }
      };
      fetchProductList();
    }, []);
    console.log("products", products)
  return (
    <div>
      AdminProducts
    </div>
  )
}

export default AdminProducts

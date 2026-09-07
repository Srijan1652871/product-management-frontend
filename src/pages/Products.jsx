import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Products = () => {
    const [products, setproducts] = useState([])
  useEffect(() => {
    // console.log("use effect working....")
    const fetchProductList = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        // console.log("response", data);
        setproducts(data?.products)
      } catch (error) {
        console.log("error", error.message);
      } finally {
        console.log("always");
      }
    };
    fetchProductList();
  }, []);
  console.log("products", products)
  return <div className="flex flex-col gap-4 justify-center items-center">
    <h2 className="text-blue-600 underline font-bold text-2xl font-mono">Product List</h2>
    <div className="flex flex-wrap gap-4 justify-center items-center">
        {products?.map((product)=>(
            <ProductCard key={product.id} product={product}/>
              
            )
        )}
    </div>
  </div>;
};

export default Products;

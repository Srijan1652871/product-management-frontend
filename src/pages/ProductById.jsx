import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const ProductById = () => {
    const {id} = useParams();
    console.log("params", id)
      const [product, setproduct] = useState(null)
      useEffect(() => {
        // console.log("use effect working....")
        const fetchProductList = async () => {
          try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await response.json();
            // console.log("response", data);
            setproduct(data)
          } catch (error) {
            console.log("error", error.message);
          } finally {
            console.log("always");
          }
        };
        fetchProductList();
      }, [id]);
      console.log("product", product)
    if(!product){
      return <h1>Loading...</h1>
    }
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-blue-600 underline font-bold text-2xl font-mono">Product Details</h1>
      <ProductCard product={product}/>
    </div>
  )
}
export default ProductById
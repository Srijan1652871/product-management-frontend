import { Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";

// const ProductCard = (props) => {
const ProductCard = ({ product }) => {
  console.log("props", product);
  const navigate = useNavigate();

  return (
    <div className="border border-black p-4 rounded-md w-[400px]">
      <img src={product.thumbnail} alt="" />
      <h2 className="text-xl font-bold flex gap-2">
        <Newspaper />
        {product.title}
      </h2>
      <p className="text-sm text-gray-500">{product.description}</p>
      <h3 className="text-purple-700 font-bold p-2 w-20">
        {product.category}
      </h3>
      <h4 className="text-red-800">Price: {product.price}</h4>
      <button className="bg-green-400 p-2 rounded-lg" onClick={()=>navigate(`/products/${product.id}`)}>View</button>
    </div>
  );
};

export default ProductCard;

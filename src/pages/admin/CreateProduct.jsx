import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

const CreateProduct = () => {
  const token = Cookies.get("token");

  const [formdata, setformdata] = useState({
    name: "",
    desc: "",
    price: "",
    category: "",
    image: null,
    publish: false,
  });

  const [error, seterror] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState("");
  const [imagepreview, setImagePreview] = useState(null);
  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    setformdata((prev) => {
      return {
        ...prev,
        [name]:
          type === "checkbox" ? checked : type === "file" ? files[0] : value,
      };
    });
  };

  const validate = () => {
    let errors = {};

    if (formdata.name === "") {
      errors.name = "Product Name is required";
    }

    if (formdata.desc === "") {
      errors.desc = "Description is required";
    }

    if (formdata.price === "") {
      errors.price = "Price is required";
    }

    if (formdata.category === "") {
      errors.category = "Category is required";
    }

    if (formdata.image === null) {
      errors.image = "Image is required";
    }

    if (formdata.publish === false) {
      errors.publish = "Mark checkbox";
    }
    seterror(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      setisError(null);
      console.log("submitted", formdata);
      const newFormData = new FormData();
      newFormData.append("name", formdata.name);
      newFormData.append("desc", formdata.desc);
      newFormData.append("category", formdata.category);
      newFormData.append("price", formdata.price);
      newFormData.append("image", formdata.image);
      try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/products`, newFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          }
        });
        console.log("response", response);
        if (response.data.success) {
          toast.success(response.data.message);
          setformdata({
            name: "",
            desc: "",
            price: "",
            category: "",
            image: null,
            publish: false,
          });
          setImagePreview(null);
        }
      } catch (error) {
        const errorMessage = error.response.data.message;
        console.log("error", errorMessage);
        setisError(errorMessage);
        toast.error(errorMessage)
      }
    }
  };

  return (
    <div className="border border-stone-700 ml-80 mt-10 flex flex-1 justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Product Form</h1>

        <div className="mb-4">
          <input
            type="text"
            onChange={handleChange}
            name="name"
            placeholder="Enter product name"
            value={formdata.name}
            className="w-full border border-gray-300 px-3 py-2"
          />

          {error.name && (
            <p className="text-red-500 text-sm mt-1">{error.name}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            onChange={handleChange}
            name="desc"
            placeholder="Enter product description"
            value={formdata.desc}
            className="w-full border border-gray-300 px-3 py-2"
          />

          {error.desc && (
            <p className="text-red-500 text-sm mt-1">{error.desc}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="number"
            onChange={handleChange}
            name="price"
            placeholder="Enter Price"
            value={formdata.price}
            className="w-full border border-gray-300 px-3 py-2"
          />

          {error.price && (
            <p className="text-red-500 text-sm mt-1">{error.price}</p>
          )}
        </div>

        <div className="mb-5">
          <select
            onChange={handleChange}
            name="category"
            value={formdata.category}
            className="w-full border border-gray-300 px-3 py-2"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Stationary">Stationary</option>
            <option value="Cloth">Cloth</option>
            <option value="Elec">Electronic Device</option>
          </select>

          {error.category && (
            <p className="text-red-500 text-sm mt-1">{error.category}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="file"
            onChange={(event) => {
              const file = event.target.files[0];
              const url = URL.createObjectURL(file);
              setImagePreview(url);
              setformdata((prev) => ({
                ...prev,
                image: file
              }))
              console.log("image event", file)
            }}
            name="image"
            accept="image/*"
            className="w-full border border-gray-300 px-3 py-2"
          />

          {error.image && (
            <p className="text-red-500 text-sm mt-1">{error.image}</p>
          )}


          {imagepreview && (
            <img src={imagepreview} alt="" style={{ width: "70px", height: "70px" }} />
          )}
        </div>

        <div className="mb-4">
          <input
            type="checkbox"
            onChange={handleChange}
            name="publish"
            checked={formdata.publish}
            className="mr-2"
          />
          <label>Publish</label>

          {error.publish && (
            <p className="text-red-500 text-sm mt-1">{error.publish}</p>
          )}
        </div>

        {isError && <p className="text-sm text-red-600">{isError}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : " Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;

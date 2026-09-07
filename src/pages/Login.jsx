import axios from "axios";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";

const Login = () => {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const [error, seterror] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setformdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validate = () => {
    let errors = {};

    if (formdata.email === "") {
      errors.email = "Email is required";
    } else if (!formdata.email.includes("@") || !formdata.email.includes(".")) {
      errors.email = "Invalid email";
    }

    if (formdata.password === "") {
      errors.password = "Password is required";
    }

    seterror(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      console.log("submitted", formdata);
      setisError("");
      setisLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/auth/login`,
          formdata,
        );
        console.log("response data", response);
        if (response.data.success) {
          toast.success(response.data.message);
          Cookies.set("token", response.data.token);
          Cookies.set("role", response.data.user.role);
          Cookies.set("userDetails", JSON.stringify(response.data.user));
          if (response.data.user.role === "admin") {
            navigate(`/admin/dashboard`)
          } else {
            navigate(`/`);
          }

        }
      } catch (error) {
        console.log("error", error?.response);
        const errMessage = error?.response?.data?.message;
        toast.error(errMessage);
        setisError(errMessage);
      } finally {
        setisLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 w-96">
        <h1 className="text-2xl font-bold text-center mb-6">
          Login to our Website
        </h1>

        <div className="mb-4">
          <input
            type="text"
            onChange={handleChange}
            name="email"
            placeholder="Enter Email"
            value={formdata.email}
            className="w-full border border-gray-300 px-3 py-2"
          />

          {error.email && (
            <p className="text-red-500 text-sm mt-1">{error.email}</p>
          )}
        </div>

        <div className="mb-5">
          <input
            type="password"
            onChange={handleChange}
            name="password"
            placeholder="Enter password"
            value={formdata.password}
            className="w-full border border-gray-300 px-3 py-2"
          />

          {error.password && (
            <p className="text-red-500 text-sm mt-1">{error.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
        </button>

        <button
          className="w-full bg-blue-300 text-white  py-2"
          onClick={() => navigate(`/Signup`)}
        >
          Dont Have An Account??
        </button>
      </form>
    </div>
  );
};
export default Login;

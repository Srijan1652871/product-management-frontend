import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const Signup = () => {
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmpwd: "",
  });
  console.log("formdata", formdata)

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

    if (formdata.username === "") {
      errors.username = "Name is required";
    }

    if (formdata.email === "") {
      errors.email = "Email is required";
    } else if (!formdata.email.includes("@") || !formdata.email.includes(".")) {
      errors.email = "Invalid email";
    }

    if (formdata.phone === "") {
      errors.phone = "Phone number is required";
    }

    if (formdata.password === "") {
      errors.password = "Password is required";
    }

    if (formdata.confirmpwd !== formdata.password) {
      errors.confirmpwd = "Password doesnt match";
    }

    seterror(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      console.log("account created", formdata);
      const payload = {
        username: formdata.username,
        email: formdata.email,
        phone: formdata.phone,
        password: formdata.password,
      };
      setisError("");
      setisLoading(true);
      try {
        //     const response = await fetch("http://localhost:5000/auth/signup",{
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(payload)
        //   })
        //   const data = await response.json();
        //   console.log("response data", data);

        //using axios
        const response = await axios.post(
         `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
          payload,
        );
        console.log("response data", response);
        if (response.data.success) {
          toast.success(response.data.message);
          navigate(`/Login`);
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
          Create New Account
        </h1>

        <div className="mb-4">
          <input
            type="text"
            onChange={handleChange}
            name="username"
            placeholder="Enter name"
            value={formdata.username}
            className="w-full border border-gray-300 px-3 py-2"
          />

          {error.username && (
            <p className="text-red-500 text-sm mt-1">{error.username}</p>
          )}
        </div>

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

        <div className="mb-4">
          <input
            type="text"
            onChange={handleChange}
            name="phone"
            placeholder="Enter Phone Number"
            value={formdata.phone}
            className="w-full border border-gray-300 px-3 py-2"
          />

          {error.phone && (
            <p className="text-red-500 text-sm mt-1">{error.phone}</p>
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

        <div className="mb-5">
          <input
            type="password"
            onChange={handleChange}
            name="confirmpwd"
            placeholder="Confirm password"
            value={formdata.confirmpwd}
            className="w-full border border-gray-300 px-3 py-2"
          />

          {error.confirmpwd && (
            <p className="text-red-500 text-sm mt-1">{error.confirmpwd}</p>
          )}
        </div>

        {isError && <p className="text-sm text-red-600">{isError}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : " Create Account"}
        </button>
      </form>
    </div>
  );
};

export default Signup;

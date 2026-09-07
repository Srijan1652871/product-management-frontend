import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
   const navigate = useNavigate(); 
  return (
    <nav className="bg-blue-300 w-full p-4 h-12 flex flex-row justify-between items-center">
      <div>logo</div>
      <div className="flex flex-row gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold underline" : "text-gray-600"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold underline" : "text-gray-600"
          }
        >
          About Us
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold underline" : "text-gray-600"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold underline" : "text-gray-600"
          }
        >
          Conatct
        </NavLink>
      </div>
      <button className="bg-slate-500 rounded-lg cursor-pointer p-2" onClick={()=>navigate("/login")}>
        Login
      </button>
    </nav>
  );
};

export default Header;

import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Products from "../pages/Products";
import NotFound from "../pages/NotFound";
import UserWrapper from "../layouts/user-pannel/UserWrapper";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProductById from "../pages/ProductById";
import AdminWrapper from "../layouts/admin-pannel/AdminWrapper";
import Dashbaord from "../pages/admin/Dashbaord";
import AdminProducts from "../pages/admin/AdminProducts";
import CreateProduct from "../pages/admin/CreateProduct";
import AdminProtected from "../components/AdminProtected";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <UserWrapper />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductById />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/admin",
    element: <AdminProtected />,
    children: [
      {
        path: "",
        element: <AdminWrapper />,
        children: [
          {
            path: "dashboard",
            element: <Dashbaord />
          },
          {
            path: "products",
            element: <AdminProducts />
          },
          {
            path: "products/create",
            element: <CreateProduct />
          }
        ]
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default Routes;

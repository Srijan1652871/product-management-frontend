
import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"
import Sidebard from "./Sidebard"


const AdminWrapper = () => {
  return (
    <div className="flex flex-col">
      <Navbar/>
      <div className="w-full flex">
        <Sidebard/>
        <div className="p-4">
            <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default AdminWrapper

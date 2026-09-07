import { LogOut } from "lucide-react"
import Cookies from "js-cookie"
//import { useNavigate } from "react-router-dom"

const Navbar = () => {
    //const navigate = useNavigate();
    const handleLogout =()=>{
Cookies.remove("token");
Cookies.remove("role");
Cookies.remove("userDetails");
// navigate("/login");
window.location.href = "/login" //for reload 

    }
    return (
        <div className="bg-slate-400 w-full p-4 h-12 flex flex-row justify-between items-center">
            <h1 className="text-xl font-bold font-mono text-blue-800">Admin Pannel</h1>
            <button className=" bg-red-600 rounded-xl p-2" onClick={handleLogout}><LogOut /></button>
        </div>
    )
}

export default Navbar

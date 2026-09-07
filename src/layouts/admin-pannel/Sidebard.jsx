import { useNavigate } from 'react-router-dom'

const Sidebard = () => {
    const navigate = useNavigate();
    return (
        <div className='h-screen w-52 bg-slate-400 p-4'>
         <div className='flex flex-col gap-4'>
               <button className='bg-white p-1 rounded-md' onClick={()=>navigate("/admin/dashboard")}>Dashbaord</button>
            <button className='bg-white p-1 rounded-md' onClick={()=>navigate("/admin/products")}>Products</button>
            <button className='bg-white p-1 rounded-md' onClick={()=>navigate("/admin/products/create")}>Create Products</button>
         </div>
        </div>
    )
}

export default Sidebard

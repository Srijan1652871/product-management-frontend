
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const UserWrapper = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
      </div>
  )
}
export default UserWrapper
import React, { useEffect } from 'react'
import SideNav from '../Components/Admin/SideNav'
import { Navigate, Outlet } from 'react-router-dom'
import TopBar from '../Components/Admin/TopBar'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';


const AdminRootLayout = () => {
  const selector = useSelector((state) => state.AdminToken)
  const  isAuthenticated = selector.is_authenticated;
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Signin Required')
    }
  }, [])
  


  return (
    <div>
      {!isAuthenticated? (<Navigate to='/adminSignin'/>):
        <div className="min-h-screen bg-neutral-200">
          <SideNav />
          <div className="p-4 xl:ml-64">
            <TopBar/>
            <Outlet />
          </div>
        </div>
      }
    </div>
  )
}

export default AdminRootLayout

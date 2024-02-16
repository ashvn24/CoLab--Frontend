import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import sign from '../../src/assets/sign.jpg'
import { useSelector } from 'react-redux';


const AuthLayout = () => {
  const selector = useSelector((state) => state.usertoken)
  const  isAuthenticated = selector.is_authenticated;
  const role = selector.user

  return (
    <div>
      {isAuthenticated ? (
        
        <Navigate to={role === 'Editor' ? '/indexEditor' : '/indexCreator'} />
      ):
      <>
      <div className="flex items-center justify-center min-h-screen">
      <div className="relative flex flex-col text-white m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* left side */}
        <Outlet/>
        {/* right side */}
        <div className="relative">
          <img
            src={sign}
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          {/* text on image  */}
          
        </div>
      </div>
    </div>
      </> 
      }
    </div>
  )
}

export default AuthLayout

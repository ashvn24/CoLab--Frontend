import React, { useEffect } from 'react'
import TopBar from '../../Components/User/TopBar'
import LeftSideBar from '../../Components/User/LeftSideBar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import BottomBar from '../../Components/User/BottomBar'
import { CreatorBottomBarLink, CreatorLeftSideBarLink } from '../../constants/Creator/CreatorIndex'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const CreatorLayout = () => {

  const {is_authenticated, user} = useSelector((state) => state.usertoken)
  const navigate = useNavigate()
  useEffect(() => {
    if (!is_authenticated) {
      toast.error('Signin Required')
    }else if(user.role !== "creator"){
      toast.warning("You don't have Creator access rights.")
      return navigate('/indexEditor',)
    }
  }, [])



  return (
    <>
    
    {!is_authenticated? <Navigate to='/' /> :
    <div className='w-full h-full md:flex'>
      <TopBar />
      <LeftSideBar LeftSideBarLink={CreatorLeftSideBarLink}/>
      <section className='flex flex-1 h-full '>
        <Outlet/>
      </section>
      <BottomBar BottomBarLink={CreatorBottomBarLink}/>
    </div>
    
    }
    
    </>
  )
}

export default CreatorLayout

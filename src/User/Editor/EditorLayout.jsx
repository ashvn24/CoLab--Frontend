import React, { useEffect } from 'react'
import TopBar from '../../Components/User/TopBar'
import LeftSideBar from '../../Components/User/LeftSideBar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import BottomBar from '../../Components/User/BottomBar'
import { BottomBarLink, LeftSideBarLink } from '../../constants/Editor'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const EditorLayout = () => {
  const {is_authenticated, user} = useSelector((state) => state.usertoken)
  const navigate = useNavigate()
  useEffect(() => {
    if (!is_authenticated) {
      toast.error('Signin Required')
    }else if(user.role !== "Editor"){
      toast.warning("You don't have editor access rights.")
      return navigate('/indexCreator',)
    }
  }, [])
  
  return (
    <>
    {!is_authenticated?(<Navigate to='/' />):
    <div className='w-full h-full md:flex'>
      <TopBar />
      <LeftSideBar LeftSideBarLink={LeftSideBarLink}/>
      <section className='flex flex-1 h-full'>
        <Outlet/>
      </section>
      <BottomBar BottomBarLink={BottomBarLink}/>
    </div>
    }
    </>
  )
}

export default EditorLayout

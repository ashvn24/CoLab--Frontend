import React from 'react'
import TopBar from '../../Components/User/TopBar'
import LeftSideBar from '../../Components/User/LeftSideBar'
import { Outlet } from 'react-router-dom'
import BottomBar from '../../Components/User/BottomBar'
import { BottomBarLink, LeftSideBarLink } from '../../constants/Editor'

const EditorLayout = () => {
  return (
    <div className='w-full h-full md:flex'>
      <TopBar />
      <LeftSideBar LeftSideBarLink={LeftSideBarLink}/>
      <section className='flex flex-1 h-full'>
        <Outlet/>
      </section>
      <BottomBar BottomBarLink={BottomBarLink}/>
    </div>
  )
}

export default EditorLayout

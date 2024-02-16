import React from 'react'
import TopBar from '../../Components/User/TopBar'
import LeftSideBar from '../../Components/User/LeftSideBar'
import { Outlet } from 'react-router-dom'
import BottomBar from '../../Components/User/BottomBar'
import { CreatorBottomBarLink, CreatorLeftSideBarLink } from '../../constants/Creator/CreatorIndex'

const CreatorLayout = () => {
  return (
    <div className='w-full h-full md:flex'>
      <TopBar />
      <LeftSideBar LeftSideBarLink={CreatorLeftSideBarLink}/>
      <section className='flex flex-1 h-full'>
        <Outlet/>
      </section>
      <BottomBar BottomBarLink={CreatorBottomBarLink}/>
    </div>
  )
}

export default CreatorLayout

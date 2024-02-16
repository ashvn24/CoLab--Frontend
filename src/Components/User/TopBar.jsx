import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../../assets/avatar.webp'
import logout from '../../assets/icons/logout.svg'


const TopBar = () => {
  return (
    <section className='topbar text-white'>
        <div className='flex-between py-4 px-5'>
            <Link to="/" className="flex gap-3 items-center" >
                <img src="" alt="CoLab" width={130} />
            </Link>
            <div className='flex gap-4'>
            <button className="flex item-center "><img src={logout} alt="logout" className="w-8 h-8 " /> </button>
            <Link className='flex-center gap-3'> 
            <img src={avatar} alt="profile" className='h-8 w-8 rounded-full' />
           </Link>
            </div>
        </div>
      
    </section>

  )
}

export default TopBar

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logout from '../../assets/icons/logout.svg'
import logo from '../../assets/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { UserLogout } from '../../Redux/Store/authSlice'
import { toast } from 'react-toastify'



const TopBar = () => {
  const { username } = useSelector((state) => state.usertoken)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function stringAvatar(username) {
    return {
      sx: {
        bgcolor: deepOrange[500],
        // bgcolor: stringToColor(name),
      },
      children: `${username.split(' ')[0][0]}`,
    };
  }

  const Logout = () =>{
    dispatch(UserLogout())
    navigate('/')
    toast.success('Logged out')
  }
  return (
    <section className='topbar text-white'>
        <div className='flex-between py-4 px-5'>
            <Link to="/" className="flex gap-3 items-center " >
                <img src={logo} alt="CoLab"  width={130} />
            </Link>
            <div className='flex gap-5'>
            <button className="flex item-center justify-center "><img src={logout} onClick={()=>Logout()} alt="logout" className="w-10 h-10 " /> </button>
            <Link className='flex-center gap-3'> 
            <Avatar {...stringAvatar(`${username}`)} className='capitalize' />
           </Link>
            </div>
        </div>
      
    </section>

  )
}

export default TopBar

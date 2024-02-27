import React from 'react'
import { Link, NavLink, useLocation, useNavigate} from 'react-router-dom'
import Logout from '../../assets/icons/logout.svg'
import { useDispatch, useSelector } from 'react-redux'
import { UserLogout } from '../../Redux/Store/authSlice'
import { toast } from 'react-toastify'
import { Avatar } from '@mui/material'
import { deepOrange,  } from '@mui/material/colors'
import logo from '../../assets/logo.svg'


const LeftSideBar = ({LeftSideBarLink}) => {

  const {pathname} = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { email, username, user } = useSelector((state) => state.usertoken)


    const logout = () =>{
      dispatch(UserLogout())
      navigate('/')
      toast.success('Logged out')
    }

    function stringAvatar(username) {
      return {
        sx: {
          bgcolor: deepOrange[500],
          // bgcolor: stringToColor(name),
        },
        children: `${username.split(' ')[0][0]}`,
      };
    }

  return (
    <nav className='leftsidebar'>
      <div className="flex flex-col gap-11 ">
            <Link to="/" className="flex gap-3 items-center justify-center" >
                <img src={logo} alt="CoLab" width={130} />
            </Link>
            <Link className='flex gap-3 items-center' to={user.role==='Editor'? '/profile' : '/creatorProfile'}>
            {/* <img src={avatar} alt="profile" className='h-10 w-10 rounded-full' /> */}
            <Avatar {...stringAvatar(`${username}`)} className='capitalize' />
            <div className="flex flex-col">
              <p className="body-bold capitalize">
                {username}
              </p>
              <p className="small-regular text-light-3">
                {email}
              </p>
            </div>
            </Link>
            <ul className="flex flex-col gap-6">
              {LeftSideBarLink.map((link) => {
                const isActive = pathname === link.route;
                return(
                  <li key={link.label} className={`leftsidebar-link group ${isActive  && 'bg-primary-500'}`}>
                    <NavLink to={link.route} className="flex gap-4 items-center p-4">
                      <img src={link.imgURL} alt="label" className={`h-6 w-6 group-hover:invert-white ${isActive && 'invert-white'}`} />
                  {link.label}
                    </NavLink>

                  </li>
                )
              })}
            </ul>
      </div>
      <button onClick={()=>logout()} className="flex item-center "><img src={Logout} alt="logout" className="w-6 h-6 mr-5"  /> 
               Logout</button>
    </nav>
  )
}

export default LeftSideBar

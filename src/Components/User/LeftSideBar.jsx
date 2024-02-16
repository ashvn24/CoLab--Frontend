import React from 'react'
import { Link, NavLink, useLocation, useNavigate} from 'react-router-dom'
import avatar from '../../assets/avatar.webp'
import Logout from '../../assets/icons/logout.svg'
import { useDispatch } from 'react-redux'
import { UserLogout } from '../../Redux/Store/authSlice'
import { toast } from 'react-toastify'


const LeftSideBar = ({LeftSideBarLink}) => {

  const {pathname} = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const logout = () =>{
      dispatch(UserLogout())
      navigate('/')
      toast.success('Logged out')
    }

  return (
    <nav className='leftsidebar'>
      <div className="flex flex-col gap-11 ">
            <Link to="/" className="flex gap-3 items-center" >
                <img src="" alt="CoLab" width={130} />
            </Link>
            <Link className='flex gap-3 items-center'>
            <img src={avatar} alt="profile" className='h-10 w-10 rounded-full' />
            <div className="flex flex-col">
              <p className="body-bold">
                John Doe
              </p>
              <p className="small-regular text-light-3">
                @username
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

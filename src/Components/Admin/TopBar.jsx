import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Breadcrumbs, Input, Navbar, Typography } from '@material-tailwind/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AdminLogout } from '../../Redux/Store/AdminauthSlice'

const TopBar = () => {

    const { pathname } = useLocation();
    const [ page] = pathname.split("/").filter((el) => el !== "");
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () =>{
        dispatch(AdminLogout())
        navigate('/adminSignin')
    }

  return (
    <Navbar
      color='gray'
      className={`rounded-xl transition-all sticky top-4 z-40 py-3 shadow-md shadow-black-500/5 bg-gradient-to-br from-gray-600 to-gray-900`}
      fullWidth
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs className={"bg-transparent p-0 transition-all mt-1"}>
            <Link to={`/${page}`}>
              <Typography
                variant="small"
                color='white'
                className="font-normal opacity-80 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {page}
              </Typography>
            </Link>
            
          </Breadcrumbs>
          
        </div>
        <div className="flex items-center mr-11 ">
          <div className="relative flex w-auto mr-auto md:mr-4 md:w-56 max-w-[24rem]">
            <Input
              color='black'
              // value={email}
              // onChange={onChange}
              className="pr-20 rounded-md bg-white"
              containerProps={{
                className: "min-w-0 ",
              }}
            />
            <button className="!absolute  right-1 top-1 items-center h-8 w-14 rounded bg-slate-500">
              search
            </button>
          </div>

          
            <div className="flex justify-end">
              <button className="bg-slate-500 h-10 hidden xl:flex items-center gap-1 px-4 normal-case rounded-md" onClick={()=>logout()}>
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                Logout
              </button>
              <div className="xl:hidden">
                <UserCircleIcon className="h-5 w-5 text-black" />
              </div>
            </div>
          

          {/* <IconButton variant="text" color='black'>
            <Cog6ToothIcon className="h-5 w-5 text-black-500" />
          </IconButton> */}
        </div>
      </div>
    </Navbar>
  )
}

export default TopBar

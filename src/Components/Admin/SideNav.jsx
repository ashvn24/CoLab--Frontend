import { Button, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AdminRoutes } from '../../constants/Admin/RouteLink'

const SideNav = () => {
    const [openSidenav, setOpenSidenav] = useState(false)
    const bg='bg-gradient-to-br from-gray-600 to-gray-900'
  return (
    <aside
      className={` ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } ${bg} fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-60 rounded-xl transition-transform duration-300 xl:translate-x-0 `}
    >
        <div
        className={`relative`}
      >
        <Link to="/" className="py-6 px-8 text-center ">
          <Typography
            variant="h6"
            // color={sidenavType === "dark" ? "white" : "blue-gray"}
            color='white'
          >
            CoLab
          </Typography>
        </Link>
        
      </div>
      <div className="m-3">
  <ul className="mb-4 flex flex-col gap-1">
    {AdminRoutes.map((link) => {
      return (
        <li key={link.path} className="mb-4 flex flex-col gap-1">
          <NavLink to={link.path}>
            {({ isActive }) => (
              <Button
                variant={isActive ? "gradient" : "text"}
                color={isActive ? "black" : "white"} // Change the color based on isActive
                className="flex items-center gap-4 px-4 capitalize"
                fullWidth
              >
                {link.icon}
                <Typography
                  color="inherit"
                  className="font-medium capitalize"
                >
                  {link.name}
                </Typography>
              </Button>
            )}
          </NavLink>
        </li>
      );
    })}
  </ul>
</div>

      {/* <div className="m-3">
        {AdminRoutes.map((link) => (
          <ul key={link.dashboard} className="mb-4 flex flex-col gap-1">
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color='white'
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div> */}
    </aside>
  )
}

export default SideNav

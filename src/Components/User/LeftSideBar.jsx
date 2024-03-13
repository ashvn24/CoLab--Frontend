import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logout from "../../assets/icons/logout.svg";
import { useDispatch, useSelector } from "react-redux";
import { UserLogout } from "../../Redux/Store/authSlice";
import { toast } from "react-toastify";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import logo from "../../assets/logo.svg";
import { Badge } from "antd";
import { Request } from "../../Redux/Store/RequestSlice";
import { NOTIFSOCKET } from "../../Axios/Api/EndPoint";
import { fetchProfile } from "../../Redux/Store/UserProfileSlice";

const LeftSideBar = ({ LeftSideBarLink }) => {
  const { profile } = useSelector((state) => state.userData);
  const { access, email, username, user, role } = useSelector(
    (state) => state.usertoken
  );
  const [notificationCount, setNotificationCount] = useState(0);
  const [socket, setSocket] = useState(null);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("role", user);

  const logout = () => {
    dispatch(UserLogout());
    navigate("/");
    toast.success("Logged out");
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile.user && access) {
      const user_id = profile.user.id;
      // dispatch(Request(user_id)).then((res) => {
      //     setNotificationCount(res.payload.length);
      // });
      getSocket();
    }
    return () => {

      if(socket){
        socket.close()
      }
    }
  }, [profile.user, access]);

  const getSocket = () => {
    if (profile.user && access) {
      const id = profile.user.id;
      const newSocket = new WebSocket(`${NOTIFSOCKET}/${id}/?token=${access}`);
      setSocket(newSocket);
      newSocket.onopen = () => console.log("WebSocket connected");
      newSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      newSocket.onclose = () => {
        console.log("WebSocket closed");
      };
    }
  };

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data) {
          setNotificationCount((prevCount) => prevCount + 1);
            
        }
        
      };
    }
  }, [socket]);

  const handleNotificationClick = () => {
    // Reset notification count
    setNotificationCount(0);
  };

  function stringAvatar(username) {
    return {
      sx: {
        bgcolor: deepOrange[500],
        // bgcolor: stringToColor(name),
      },
      children: `${username.split(" ")[0][0]}`,
    };
  }

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11 ">
        <Link to="/" className="flex gap-3 items-center justify-center">
          <img src={logo} alt="CoLab" width={130} />
        </Link>
        <Link
          className="flex gap-3 items-center"
          to={
            user.role && user.role === "Editor" ? "/profile" : "/creatorProfile"
          }
        >
          {/* <img src={avatar} alt="profile" className='h-10 w-10 rounded-full' /> */}
          <Avatar {...stringAvatar(`${username}`)} className="capitalize" />
          <div className="flex flex-col">
            <p className="body-bold capitalize">{username}</p>
            <p className="small-regular text-light-3">{email}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {LeftSideBarLink.map((link) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <div
                    className="flex flex-row justify-between items-center w-full"
                    onClick={handleNotificationClick}
                  >
                    <div className="flex flex-row gap-6">
                      <img
                        src={link.imgURL}
                        alt="label"
                        className={`h-6 w-6 group-hover:invert-white ${
                          isActive && "invert-white"
                        }`}
                      />
                      {link.label}
                    </div>
                    <div>
                      {link.label === "Activity" && (
                        <Badge count={notificationCount}></Badge>
                      )}
                    </div>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <button onClick={() => logout()} className="flex item-center ">
        <img src={Logout} alt="logout" className="w-6 h-6 mr-5" />
        Logout
      </button>
    </nav>
  );
};

export default LeftSideBar;

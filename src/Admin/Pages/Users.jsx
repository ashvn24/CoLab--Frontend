import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { Avatar, Chip } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { Switch } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, userBlock } from '../../Redux/Store/UsersListSlice';
import { toast } from 'react-toastify';
import { UserStatus } from '../../Axios/AdminServer/AdminServer';
// import  toggleBtn  from "../../Components/Admin/toggleBtn";
import './toggle.css';

const Users = () => {

  const dispatch = useDispatch()
  const { users, status, error } = useSelector((state) => state.userList)
  const [userList, setuserList] = useState([])

  if(error){
    toast.error(error)
  }

// fetch users from sUsersListSlice
  useEffect(() => {

    dispatch(fetchUsers());
    if(users?.length!==0 ){
      setuserList(users)
    }
  }, [dispatch]);

  const handleToggle = (id) => {
    
    UserStatus(id).then((res) =>{
      dispatch(userBlock(id));
      setuserList((prevuserList)=> {
        return prevuserList.map((user) => {
          if(user.id === id){
            return {
              ...user,
              is_active:!user.is_active
            }
          }
          return user;
        })
      })

    })
  };

  console.log('selecor',users);
  console.log('state',userList);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && (
        <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="black">
            Users Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] text-black table-auto">
            <thead>
              <tr>
                {["User", "Role", "status", "Joined", "Block/Unblock"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody >
              {userList.map(
                ({ img, username, email, role, is_active, date_joined,id }, key) => {
                  const className = `py-3 px-5 ${
                    key === userList.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={email}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {username}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {role}
                        </Typography>
                        
                      </td>
                      <td className={className}>

                      <Chip label={is_active ? "Active":"Inactive"}
                       color={is_active ? "success":"primary"} />
                        
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date_joined}
                        </Typography>
                      </td>
                      <td className={className}>
                      {/* {is_active ? <Switch  defaultChecked  onChange={()=>handleToggle(id)}/>:<Switch  onChange={()=>handleToggle(id)}/>} */}
                      <label class="switch-button" for="switch">
                    <div class="switch-outer">
                      <input id="switch" type="checkbox"/>
                      <div class="button">
                        <span class="button-toggle"></span>
                        <span class="button-indicator"></span>
                      </div>
                    </div>
                  </label>
                        
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>)}
    </div>
  )
}

export default Users

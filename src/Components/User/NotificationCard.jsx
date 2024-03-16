import React, { useEffect, useState } from "react";
import { stringAvatar, timeAgo } from "../../constants/Editor/utils/formater";
import { Avatar } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Accept, Reject } from "../../Axios/UserServer/UserServer";
import { AcceptReq } from "../../Redux/Store/RequestSlice";
import { useDispatch } from "react-redux";
import { axiosInstanceUser } from "../../Axios/Utils/axiosInstance";

const NotificationCard = ({ setNotification, reqs }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState([])
  const [isaccept, setIsaccept] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if(reqs.work===null){
      getStatus(reqs.obj)
    }
  }, [reqs])

  const handleRequest = async (id) => {
    setIsaccept(true)
    const response = await Accept(id);
    if (response.status === 200) {
      toast.success("Post accepted");
      dispatch(AcceptReq(id));
    }
  };

  const handleReject = (id) => {
    Reject(id).then((res) => {
      if(res.status===204){

        setNotification((notification) => {
          return notification.filter((noti) => {
            return noti.id !== id;
          });
        });
      }else{
        toast.error(res.status)
      }
    })
  }
  

  const handleReq = () => {
    reqs.work?navigate(`/reviewWork/${reqs.work}`):''

  }
  
  

  const getStatus = async (id) => {
    const Res = await axiosInstanceUser.get(`/viewrequest/${id}`).then((res)=>{
      return res.data
    })
    setStatus(Res)
    
  }

  return (
    <div onClick={handleReq} className="flex w-full flex-col rounded-xl bg-dark-4 p-7">
      
      <div className="flex items-start  justify-evenly">
        <div className="flex w-full flex-1 items-center flex-row gap-3">
          <Link>
            <Avatar
              {...stringAvatar('N')}
              className="capitalize"
            />
          </Link>
          <p>{reqs.message}</p>
        </div>
            {reqs.obj?
        <div className="flex  items-center mt-1 gap-6 mr-12">
          {status.accepted ? (
            <p className="mt-1">Accepted</p>
          ) : (
            <>
            {isaccept? 'Accepted':
            <>
              <button onClick={() => handleReject(status.id)}>
                <CloseCircleOutlined style={{ fontSize: "29px" }} />
              </button>
              <button onClick={() => handleRequest(status.id)}>
                <CheckCircleOutlined style={{ fontSize: "29px" }} />
              </button></>}
            </>
          )}
        </div> :''}
        <div className='flex item-center mt-2'>
            <p> {timeAgo(reqs.timestamp)}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;

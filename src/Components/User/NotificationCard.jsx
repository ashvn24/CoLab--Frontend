import React, { useEffect } from "react";
import { stringAvatar } from "../../constants/Editor/utils/formater";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Accept, Reject } from "../../Axios/UserServer/UserServer";
import { AcceptReq } from "../../Redux/Store/RequestSlice";
import { useDispatch } from "react-redux";

const NotificationCard = ({ setActivity, reqs }) => {
  const dispatch = useDispatch();

  const handleRequest = async (id) => {

    const response = await Accept(id);
    if (response.status === 200) {
      setActivity((prevactivity) => {

        return prevactivity.map((noti) => {
          if (noti.id === id) {
            return {
              ...noti,
              accepted: true,
            };
          }
          return noti;
        });
      });
      toast.success("Post accepted");
      dispatch(AcceptReq(id));
    }
  };

  const handleReject = (id) => {
    Reject(id).then((res) => {
      if(res.status===204){

        setActivity((prevactivity) => {
          return prevactivity.filter((noti) => {
            return noti.id !== id;
          });
        });
      }else{
        toast.error(res.status)
      }
    })
  }

  return (
    <div className="flex w-full flex-col rounded-xl bg-dark-4 p-7">
      <div className="flex items-start  justify-evenly">
        <div className="flex w-full flex-1 items-center flex-row gap-3">
          <Link>
            <Avatar
              {...stringAvatar(`${reqs.editor.username}`)}
              className="capitalize"
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium  lg:body-bold text-light-1 capitalize">
              {reqs.editor.username}
            </p>
          </div>
          <p>requested for the access of post:</p>
          <p>{reqs.post.title}</p>
        </div>

        <div className="flex  items-center mt-1 gap-6">
          {reqs.accepted ? (
            <p className="mt-1">Accepted</p>
          ) : (
            <>
              <button onClick={() => handleReject(reqs.id)}>
                <CloseCircleOutlined style={{ fontSize: "29px" }} />
              </button>
              <button onClick={() => handleRequest(reqs.id)}>
                <CheckCircleOutlined style={{ fontSize: "29px" }} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;

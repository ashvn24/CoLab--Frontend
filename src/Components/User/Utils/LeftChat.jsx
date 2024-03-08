import React, { useEffect, useState } from "react";
import { stringAvatar } from "../../../constants/Editor/utils/formater";
import { Avatar } from "@mui/material";
import { axiosInstanceUser } from "../../../Axios/Utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../../Redux/Store/UserProfileSlice";

const LeftChat = ({edit, Chat = () => { } }) => {

  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userData);
  const [chatUser, setChatUser] = useState([])
  const userId = profile ? profile.user.id : '';
  
  useEffect(() => {
    dispatch(fetchProfile());
    console.log(userId,'user');
    getChatUsers(userId); // Pass userId as a parameter
  }, []);

  const getChatUsers = async (userId) => {
    try {
      const res = await axiosInstanceUser.get(`/mywork/${userId}`);
      setChatUser(res.data)
      console.log(chatUser); 
    } catch (error) {
      console.error("Error fetching chat users:", error);
    }
  };
  return (
    <>
      <nav className="md:flex px-6 py-5 flex-col  min-w-[210px] min-h-[610px] rounded-tl-3xl rounded-bl-3xl bg-dark-4">
    <div className="text-white font-bold mb-10 mt-5 text-center">Users</div>
    <div className="flex flex-col gap-9">
        {/* Sample user data */}
        {chatUser.map((usr,index)=>(
          <button onClick={() => Chat(edit ? { id: usr.post.user.id, username: usr.post.user.username } : { id: usr.editor.id, username: usr.editor.username })}>
          <div key={index}>
            <div className="flex items-center gap-1">
                <div className="flex flex-row items-center gap-5">
                    <Avatar {...stringAvatar(edit ? usr.post.user.username : usr.editor.username )} className="capitalize" />
                    <p className="font-bold capitalize">{edit ? usr.post.user.username : usr.editor.username }</p>
                </div>
            </div>
          </div>
          </button>
         
        ))}
    </div>
</nav>

    </>
  );
};

export default LeftChat;

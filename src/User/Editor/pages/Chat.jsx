import React, { useState } from "react";
import LeftChat from "../../../Components/User/Utils/LeftChat";
import ChatLayout from "../../../Components/User/Utils/ChatLayout";

const Chat = () => {
  const [usr , setUsr ] = useState('')
  const [usrname , setUsrname ] = useState('')
  const Chat = (id, username) => {
    console.log("id:", id);
    console.log("username:", username);

    // Assuming setUsr and setUsrname are state update functions
    // You can set the states with the received id and username
    setUsr(id.id);
    setUsrname(id.username);
    console.log(usr,usrname);
}


return (
  <div>
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-post">
          <h2 className="h3-bold md:h2-bold text-left w-full">Chat</h2>
          <div className=" p-5 relative">
            <div className="w-full h-full  md:flex">
              <div className="hidden md:block w-full md:w-2/12">
              <LeftChat Chat={Chat} edit/>
              </div>
              <div className="hidden md:block w-full md:w-3/4">
              <section className="flex flex-1 w-full h-full">
                <ChatLayout usr={usr} usrname={usrname} />
              </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Chat;

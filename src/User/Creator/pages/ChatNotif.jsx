import React, { useState } from "react";
import LeftChat from "../../../Components/User/Utils/LeftChat";
import ChatLayout from "../../../Components/User/Utils/ChatLayout";

const ChatNotif = () => {
    const [usr , setUsr ] = useState('')
    const [usrname , setUsrname ] = useState('')
    const Chat =(id,user) => {
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
              <div className="w-full h-full md:flex">
                <LeftChat Chat={Chat} cre/>
                <section className="flex flex-1 w-full h-full">
                  <ChatLayout usr={usr} usrname={usrname} />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatNotif;

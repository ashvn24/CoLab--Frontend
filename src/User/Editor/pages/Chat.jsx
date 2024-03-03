import React from "react";
import ChatForm from "../../../Components/User/ChatForm";

const Chat = () => {
  return (
    <div>
      <div className="flex flex-1">
        <div className="home-container">
          <div className="home-post">
            <h2 className="h3-bold md:h2-bold text-left w-full">Chat</h2>
            <ChatForm/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

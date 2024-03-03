import React from "react";
import LeftChat from "./Utils/LeftChat";
import ChatArea from "./Utils/ChatArea";
const ChatForm = () => {
  return (
    <div>
      <div className=" p-5 relative">
        <div className="w-full h-full md:flex">
            <LeftChat />
            <section className='flex flex-1 w-full h-full'>
            <ChatArea/>
            </section>
        </div>
      </div>
    </div>
  );
};

export default ChatForm;

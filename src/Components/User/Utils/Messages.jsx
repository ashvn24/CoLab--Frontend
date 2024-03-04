import React from "react";

const Messages = ({ text, send, sender }) => {
  return (
    <div
      className={`mb-9 ${send === sender ? " flex justify-end  " : "flex justify-start "}`}
    >
      <div
        className={`max-w-[70%] px-3 py-3 rounded-2xl  ${
          send === sender ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600 "
        }font-bold`}
      >
        {text}
      </div>
    </div>
  );
};

export default Messages;

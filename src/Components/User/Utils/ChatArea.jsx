import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../../constants/Editor/utils/formater";
import video from "../../../assets/icons/videocall.svg";
import { Badge } from "antd";
import { Button, Input } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { SOCKET } from "../../../Axios/Api/EndPoint";

const ChatArea = () => {
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState('')
    const {access} = useSelector((state) => state.usertoken)
    const { id } = useParams();

    useEffect(() => {
        let newSocket = null; // Declare newSocket outside the if block

        if (id && access) {
          newSocket = new WebSocket(`${SOCKET}/${id}/?token=${access}`);
          setSocket(newSocket);
          newSocket.onopen = () => console.log("WebSocket connected");
          newSocket.onclose = () => {
            console.log("WebSocket disconnected");
            setTimeout(initializeWebSocket, 5000);
          };
        }
      
        // Return a cleanup function
        return () => {
          if (newSocket) {
            newSocket.close();
          }}
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newMessage && socket) {
          const data = {
            message: newMessage,
          };
          socket.send(JSON.stringify(data));
          setNewMessage("");
        }
      };
      
    useEffect(() => {
        if (socket) {
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message) {
              setMessages((prevMessages) => [...prevMessages, data]);
            } else {
                console.error("Unexpected message format:", data);
            }
          };
        }
        console.log(messages);
      }, [socket]);

    
    

  return (
    <nav
      className="md:flex flex-col justify-between min-w-[950px] min-h-[610px] rounded-tr-3xl rounded-br-3xl bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/Desktop.png)",
      }}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex px-5 h-20 items-center rounded-tr-3xl justify-between bg-dark-4">
          <div className="flex flex-row items-center gap-5">
            <Avatar {...stringAvatar("user")} className="capitalize" />
            <p className="font-bold">User</p>
            <p className="small-regular text-light-3">
              <Badge status="success" /> online
            </p>
          </div>
          <div className="mr-3 item-center">
            <button>
              <img src={video} alt="vcall" className="h-8 w-8" />
            </button>
          </div>
        </div>
        <div className="flex-1 p-5 overflow-y-auto max-h-[480px] scrollbar-hide ">
          <div className="flex flex-col">
            {messages.map((msg,index) => {

            <Messages text={msg.message} sent />
            })}
            
          </div>
        </div>

        <div className="flex flex-row gap-3 p-4  w-full ">
          <Input
            value={newMessage}
            radius={"full"}
            type="text"
            placeholder="Enter your message here"
            className="max-w-full"
            onChange={(e)=>setNewMessage(e.target.value)}
          />
          <Button radius="full" className="h-14" onClick={handleSubmit}>
            send
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default ChatArea;

import React, { useEffect, useRef, useState } from "react";
import Messages from "./Messages";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../../constants/Editor/utils/formater";
import video from "../../../assets/icons/videocall.svg";
import { Badge } from "antd";
import { Button, Input } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SOCKET } from "../../../Axios/Api/EndPoint";
import { fetchProfile } from "../../../Redux/Store/UserProfileSlice";
import { ChatMsg } from "../../../Redux/Store/ChatSlice";

const ChatArea = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState("");
  const { access } = useSelector((state) => state.usertoken);
  const { profile } = useSelector((state) => state.userData);
  const { msg } = useSelector((state) => state.chat);
  const { id } = useParams();
  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProfile());
    const user_id1 = id;
    const user_id2 = profile.user.id;
    console.log(user_id1, user_id2, "user");
    Getchats(user_id1, user_id2);
  }, []);

  const Getchats = async (user_id1, user_id2) => {
    const id = {
      user_id1,
      user_id2,
    };
    const res = await dispatch(ChatMsg(id));
    if (res.payload.length !== 0) {
      setMessages(res.payload);
    }
    console.log(messages, "chats");
  };

  useEffect(() => {
    let newSocket = null; // Declare newSocket outside the if block

    if (id && access) {
      newSocket = new WebSocket(`${SOCKET}/${id}/?token=${access}`);
      setSocket(newSocket);
      newSocket.onopen = () => console.log("WebSocket connected");
    }

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Handle socket closures
    newSocket.onclose = () => {
      console.log("WebSocket closed");
      // Reconnect logic could be added here if needed
    };

    // Return a cleanup function
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [id, access]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newMessage && socket) {
      // Check if the socket is closed
      if (socket.readyState === WebSocket.CLOSED) {
        // Reconnect the socket
        const newSocket = new WebSocket(`${SOCKET}/${id}/?token=${access}`);
        newSocket.onopen = () => {
          console.log("WebSocket reconnected");
          // Send the message after the socket is reconnected
          const data = {
            message: newMessage,
          };
          newSocket.send(JSON.stringify(data));
          setSocket(newSocket); // Update the socket state
        };
        // Set the new socket for future use
        setSocket(newSocket);
      } else {
        // Send the message if the socket is open
        const data = {
          message: newMessage,
        };
        socket.send(JSON.stringify(data));
      }
      setNewMessage("");
    }
  };
  

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.content) {
          setMessages((prevMessages) => [...prevMessages, data]);
        } else {
          console.error("Unexpected message format:", data);
        }
      };
    }
    console.log(messages);
  }, [socket]);

  useEffect(() => {
    // Scroll to the bottom of the chat container
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]); 

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
        <div className="flex-1 p-5 overflow-y-auto max-h-[480px] scrollbar-hide " ref={chatContainerRef}>
          <div className="flex flex-col">
            {messages
              .slice() // Create a copy of the array to avoid mutating the original
              .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // Sort by timestamp
              .map((msg, index) => (
                <Messages key={index} text={msg.content} send={msg.user} sender={profile.user.id} />

              ))}
          </div>
        </div>

        <div className="flex flex-row gap-3 p-4  w-full ">
          <Input
            autoFocus
            value={newMessage}
            radius={"full"}
            type="text"
            placeholder="Enter your message here"
            className="max-w-full"
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(event);
              }
            }}
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

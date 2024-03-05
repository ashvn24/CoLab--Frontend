import { Avatar } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { stringAvatar } from '../../../constants/Editor/utils/formater';
import video from '../../../assets/icons/videocall.svg'
import { Button, Input } from '@nextui-org/react';
import { Badge } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../../Redux/Store/UserProfileSlice';
import { ChatMsg } from '../../../Redux/Store/ChatSlice';
import { SOCKET } from '../../../Axios/Api/EndPoint';
import Messages from './Messages';

const ChatMessage = ({usr, usrname}) => {

    const { profile } = useSelector((state) => state.userData);
    const { access } = useSelector((state) => state.usertoken);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const dispatch = useDispatch();
    const chatContainerRef = useRef(null);

    useEffect(() => {
        dispatch(fetchProfile());
        const user_id1 = usr;
        const user_id2 = profile.user.id;
        console.log(user_id1, user_id2, "userss");
        Getchats(user_id1, user_id2);
    }, [usr, usrname]);

    const Getchats = async (user_id1, user_id2) => {
        if (socket) {
            socket.close();
        }
        const id = {
            user_id1,
            user_id2,
        };
        const res = await dispatch(ChatMsg(id));
        setMessages(res.payload);
        console.log(messages, "chats");
    };

    useEffect(() => {
        getSocket();
        // Return a cleanup function
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [usr, access]);

    const getSocket = () => {
        let newSocket = null;
        if (usr && access) {
            newSocket = new WebSocket(`${SOCKET}/${usr}/?token=${access}`);
            setSocket(newSocket);
            newSocket.onopen = () => console.log("WebSocket connected");

            newSocket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };

            newSocket.onclose = () => {
                console.log("WebSocket closed");
                // getSocket()
            };

            
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newMessage && socket) {
            if (socket.readyState === WebSocket.CLOSED){
                getSocket()
            }else if (socket.readyState === WebSocket.OPEN) {
                const data = {
                    message: newMessage,
                };
                socket.send(JSON.stringify(data));
                
                setNewMessage("");
            }
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
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        } else {
            console.error("chatContainerRef is null");
        }
    }, [messages, chatContainerRef]);

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="flex px-5 h-20 items-center rounded-tr-3xl  justify-between bg-dark-4">
                <div className="flex flex-row items-center gap-5">
                    <Avatar {...stringAvatar(usrname ? usrname : 'user')} className="capitalize" />
                    <p className="font-bold capitalize">{usrname ? usrname : 'user'}</p>
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
            <div className="flex-1 p-5 overflow-y-auto max-h-[440px] scrollbar-hide " ref={chatContainerRef}>
                <div className="flex flex-col">
                    {messages
                        .slice()
                        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
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
    );
}

export default ChatMessage;

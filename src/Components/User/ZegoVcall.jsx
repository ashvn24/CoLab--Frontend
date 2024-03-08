import React, { useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useNavigate, useParams } from "react-router-dom";
import { SOCKET, VURL } from "../../Axios/Api/EndPoint";
import { useSelector } from "react-redux";
import { v4 } from 'uuid'

const ZegoVcall = () => {
  const { usrname, usr } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState(
    `${VURL}/meeting/${usrname}/${usr}`
  );
  const { access, user } = useSelector((state) => state.usertoken);
  const [socket, setSocket] = useState(null);

  const myMeeting = async (element) => {
    const appID = 1095954120;
    const serverSecret = "663dd4a35ee5e9a8c701136b93154475";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      usrname,
      Date.now().toString(),
      v4()
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      onLeaveRoom: () => {
        const destination = user.role === "Editor" ? "/chatEditor" : "/chat";
        navigate(destination);
      },
    });
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
      newSocket.onopen = () => {
        console.log("WebSocket connected");
        const data = {
          message: `Visit this link to join the meet ${newMessage}`,
        };
        if (newSocket !== null) {
          // Check if newSocket is not null
          newSocket.send(JSON.stringify(data)); // Send data using newSocket
        } else {
          console.error("Socket is null. Cannot send data.");
        }
      };
      newSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      newSocket.onclose = () => {
        console.log("WebSocket closed");
        // getSocket()
      };
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-full h-full" ref={myMeeting} />
    </div>
  );
};

export default ZegoVcall;

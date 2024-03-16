import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Request } from "../../../Redux/Store/RequestSlice";
import Loader from "../../../Components/User/Utils/Loader";
import NotificationCard from "../../../Components/User/NotificationCard";
import { fetchProfile } from "../../../Redux/Store/UserProfileSlice";
import { axiosInstanceUser } from "../../../Axios/Utils/axiosInstance";
import { NOTIFSOCKET } from "../../../Axios/Api/EndPoint";

const CreatorActivity = () => {
  const { profile } = useSelector((state) => state.userData);
  const { access } = useSelector((state) => state.usertoken);
  const [notification, setNotification] = useState([]);
  const [status, setStatus] = useState("");
  const [socket, setSocket] = useState('')
  const dispatch = useDispatch();
  // console.log(req);

  useEffect(() => {
    dispatch(fetchProfile());
    const user_id = profile.user.id;
    GetNotificationCreator(user_id);
  }, []);

  const GetNotificationCreator = async (user_id) => {
    setStatus("Loading");
    const res = await axiosInstanceUser
      .get(`/not/notifList/`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNotification(res.data);
        setStatus("");
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
  }, [access]);

  const id = profile.user.id;
  const getSocket = () => {
    let newSocket = null;
    if (id && access) {
      newSocket = new WebSocket(`${NOTIFSOCKET}/${id}/?token=${access}`);
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

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data) {
          console.log(data);
          setNotification((prevNotification) => [...prevNotification, data]);
          console.log(notification);
        }
      };
    }
  }, [socket]);

  return (
    <>
      {status === "Loading" ? (
        <Loader />
      ) : (
        <div className="flex flex-1">
          <div className="home-container">
            <div className="home-posts">
              <h2 className="h3-bold md:h2-bold text-left w-full">
                My Activity
              </h2>
              <ul className="flex flex-col flex-1 gap-9 w-full">
                {notification ? (
                  notification.map((reqs, key) => {
                    return (
                      <li key={key}>
                        <NotificationCard
                          reqs={reqs}
                          setNotification={setNotification}
                        />
                      </li>
                    );
                  })
                ) : (
                  <p>no post available</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatorActivity;

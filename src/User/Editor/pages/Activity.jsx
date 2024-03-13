import React, { useEffect, useState } from 'react'
import NotificationMsg from '../../../Components/User/NotificationMsg';
import { useDispatch, useSelector } from 'react-redux';
import { Request } from '../../../Redux/Store/RequestSlice';
import { fetchProfile } from '../../../Redux/Store/UserProfileSlice';
import Loader from '../../../Components/User/Utils/Loader';
import { NOTIFSOCKET } from '../../../Axios/Api/EndPoint';

const Activity = () => {
    const { profile } = useSelector((state) => state.userData);
    const { status } = useSelector((state) => state.request);
    const { access } = useSelector((state) => state.usertoken);
    const [notification, setNotification] = useState('')
    const [socket, setSocket] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfile());
        const user_id = profile.user.id;
        GetNotification(user_id)
    }, [])
    
    const GetNotification = async (user_id) => {
        const res = await dispatch(Request(user_id));
        setNotification(res.payload)
        console.log(notification)
    }

    useEffect(() => {
        getSocket();
        // Return a cleanup function
        return () => {
          if (socket) {
            socket.close();
          }
        };
    }, [access]);
    
    const id = profile.user.id
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
              setNotification((prevNotification) => [...prevNotification, data]);
            } 
          };
        }
        console.log(notification);
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
                        <NotificationMsg
                          reqs={reqs}
                        //   setActivity={setActivity}
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
  )
}

export default Activity

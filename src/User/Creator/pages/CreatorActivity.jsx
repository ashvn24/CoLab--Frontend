import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Request } from "../../../Redux/Store/RequestSlice";
import Loader from "../../../Components/User/Utils/Loader";
import NotificationCard from "../../../Components/User/NotificationCard";
import { fetchProfile } from "../../../Redux/Store/UserProfileSlice";
import { axiosInstanceUser } from "../../../Axios/Utils/axiosInstance";

const CreatorActivity = () => {
  
  const { profile } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const [activity, setActivity] = useState([]);
  const [status, setStatus] = useState('')
  // console.log(req);
  
  useEffect(() => {
    dispatch(fetchProfile());
    const user_id = profile.user.id;
    GetNotificationCreator()
  }, []);

  const GetNotificationCreator = async () => {
    setStatus('Loading')
    const res = await axiosInstanceUser.get('viewrequest/')
    setStatus('')
    setActivity(res.data)
    console.log(res)
}

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
                {activity ? (
                  activity.map((reqs, key) => {
                    return (
                      <li key={key}>
                        <NotificationCard
                          // handleChange={handleChange}
                          reqs={reqs}
                          setActivity={setActivity}
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

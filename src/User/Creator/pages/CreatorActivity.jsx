import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Request } from "../../../Redux/Store/RequestSlice";
import Loader from "../../../Components/User/Utils/Loader";
import NotificationCard from "../../../Components/User/NotificationCard";

const CreatorActivity = () => {
  const { req, status, error } = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const [change, setChange] = useState("");
  const [activity, setActivity] = useState([])
  useEffect(() => {
    dispatch(Request());
    if(req?.length!==0 ){
      setActivity(req)
    }
  }, [change]);

  const handleChange = (id) => {
    setChange(id);
  };

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
                          handleChange={handleChange}
                          reqs={reqs}
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

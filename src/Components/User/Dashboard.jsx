import React, { useEffect, useState } from "react";
import { axiosInstanceUser } from "../../Axios/Utils/axiosInstance";
import Loader from "./Utils/Loader";

const Dashboard = () => {
  const [channel, setChannel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getYtData();
  }, []);

  const getYtData = async () => {
    const channel_name = "UCoFId24HnrDZAnoXjFa_IMg";
    try {
      // const response = await axiosInstanceUser.get(`/yt/getData/`,{
      //   params: {
      //     channel_name: channel_name
      //   }
      // });
      console.log("res", response.data);
      setChannel(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  return (
    <div className="flex w-full flex-col min-h-fit mt-10 rounded-xl bg-dark-4 p-8 relative">
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between">
          <div>
            <img
              src={
                channel && channel.profile_image_url
                  ? channel.profile_image_url
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt="Profile Image"
              className="rounded-full h-32 w-32 object-cover border-3"
            />
          </div>
          <div className="flex w-1/4 h-[150px] flex-col justify-around rounded-xl bg-dark-3 p-7">
            <h1 className="h3-bold">Total Subscribers:</h1>
            <p className="h3-bold">
              {channel ? channel.subscriber_count : "--"}
            </p>
          </div>
          <div className="flex w-1/4 h-[150px] flex-col justify-around rounded-xl bg-dark-3 p-7 ">
            <p className="h3-bold">Total Videos:</p>
            <p className="h3-bold">{channel ? channel.video_count : "--"}</p>
          </div>
          <div className="flex w-1/4 h-[150px] flex-col justify-around rounded-xl bg-dark-3 p-7 ">
            <p className="h3-bold">Total Views:</p>
            <p className="h3-bold">{channel ? channel.view_count : "--"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

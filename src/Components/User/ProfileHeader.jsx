import { Avatar } from "@mui/material";
import React, { useEffect } from "react";
import { stringAvatar } from "../../constants/Editor/utils/formater";
import { useDispatch, useSelector } from "react-redux";
import Instagram from "./Utils/Instagram";
import Youtube from "./Utils/Youtube";
import Facebook from "./Utils/Facebook";
import Twitter from "./Utils/Twitter";
import { fetchProfile } from "../../Redux/Store/UserProfileSlice";
import Loader from "./Utils/Loader";
import UpdateProfile from "./UpdateProfile";
import { BASEURL } from "../../Axios/Api/EndPoint";

const ProfileHeader = () => {
  const { profile,status,error } = useSelector((state) => state.userData);
  const dispatch = useDispatch()
  console.log(profile);
  useEffect(() => {
    dispatch(fetchProfile())
  }, [])
  if(status === 'Loading'){
    return <div className="flex flex-1 justify-center items-center"><Loader/></div>
  }
  return (

    <div className="flex flex-1 w-full">
  <div className="home-container w-full">
    <div className="home-post">
      <h2 className="h3-bold md:h2-bold text-left w-full">My Profile</h2>
      <div className="flex w-[80rem] flex-col min-h-fit mt-10 rounded-xl bg-dark-4 p-16">
        <div className="flex w-full flex-col justify-start">
          <div className="flex w-full items-center justify-between">
            <div className="flex w-full flex-1 items-center gap-3">
              <div>
                {profile.profile_image ? (
                  <div className="rounded-full border-2 border-white p-1">
                    <img
                      className="rounded-full w-40 h-40 object-cover"
                      // src={`${BASEURL}${profile.profile_image}`}
                      src={profile.profile_image}
                      alt="Profile"
                    />
                  </div>
                ) : ( 
                      <Avatar
                        {...stringAvatar(`${profile.user && profile.user.username}`)}
                        className="capitalize"
                      />
                  )}
               
              </div>
              <div className="flex-1">
              {profile.user && (
                <h2 className="text-left h3-bold text-light-1">
                  {`@${profile.user.username}`}
                </h2>
              )}
              {profile.user && (
                <p className="small-regular text-light-3">{profile.user.email}</p>)}
              </div>
            </div>
            <div>
              <UpdateProfile />
            </div>
          </div>
          <div className="flex flex-row gap-5 mt-16">
            {profile.channel_link && <Youtube link={profile.channel_link} />}
            {profile.instagram && <Instagram />}
            {profile.facebook && <Facebook />}
          </div>
          <p className="mt-6  text-base-regular text-light-2">{profile.bio && profile.bio}</p>
        </div>
      </div>
    </div>
    <h2 className="h3-bold md:h2-bold text-left w-full">Saved Post</h2>
  </div>
</div>


  );            
};

export default ProfileHeader;

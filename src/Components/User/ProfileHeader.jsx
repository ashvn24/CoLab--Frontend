import { Avatar } from "@mui/material";
import React from "react";
import { stringAvatar } from "../../constants/Editor/utils/formater";
import { useSelector } from "react-redux";

const ProfileHeader = () => {
  const { user } = useSelector((state) => state.usertoken);
  console.log(user);
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <Avatar
              {...stringAvatar(`${user.username}`)}
              className="capitalize"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left  .h3-bold text-light-1">
              {`@${user?.username}`}
            </h2>
            <p className="small-regular text-light-3">{user.email}</p>
          </div>
        </div>
      </div>
        <p className="mt-6  text-base-regular text-light-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
    </div>
  );
};

export default ProfileHeader;

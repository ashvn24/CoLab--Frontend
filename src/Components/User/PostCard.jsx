import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import {
  formatDateString,
  stringAvatar,
} from "../../constants/Editor/utils/formater";
import { useSelector } from "react-redux";
import PostAction from "./Utils/PostAction";
import UpdatePost from "../../User/Creator/pages/UpdatePost";

const PostCard = ({ post, handleChange=()=>{} }) => {
  const { email, user } = useSelector((state) => state.usertoken);

  return (
    <div className="flex w-full flex-col rounded-xl bg-dark-4 p-7">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-3">
          <Link>
            <Avatar
              {...stringAvatar(`${post.user.username}`)}
              className="capitalize"
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1 capitalize">
              {post.user.username}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {formatDateString(post.created_at)}
              </p>
            </div>
          </div>
        </div>
        
      </div>

      <Link
        to={
          user && user.role === "Editor"
            ? `/postDetail/${post.id}`
            : `/mypostDetail/${post.id}`
        }
      >
        <div className="small-medium lg:base-medium py-5">
          <p>{post.title}</p>
        </div>
        <div>
          <p>{post.description}</p>
        </div>
      </Link>
      <PostAction handleChange={handleChange} email={email} post={post} />
    </div>
  );
};

export default PostCard;

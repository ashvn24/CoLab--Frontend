import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PostDetail } from "../../../Redux/Store/postSlice";
import VideoLayout from "../../../Components/User/VideoLayout";
import UpdatePost from "./UpdatePost";
import Loader from "../../../Components/User/Utils/Loader";
import { toast } from "react-toastify";
import { Avatar } from "@mui/material";
import {
  formatDateString,
  stringAvatar,
} from "../../../constants/Editor/utils/formater";

const MypostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(PostDetail(id));
  }, [dispatch, id]);

  const { post, status, error } = useSelector((state) => state.postDetails);
  console.log(post);



  if (status === "Loading") {
    return <Loader />;
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-post ">
          <h2 className="h3-bold md:h2-bold text-left w-full">My Post</h2>
          <div className="flex w-full flex-col min-h-fit mt-10 rounded-xl bg-dark-4 p-20 relative">
            <div className="flex justify-between">
              <div className="flex items-start gap-5 justify-between">
                <Link>
                  <Avatar
                    {...stringAvatar(`${post.user && post.user.username}`)}
                    className="capitalize"
                  />
                </Link>
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1 capitalize">
                    {post.user?.username}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {formatDateString(post.created_at)}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <UpdatePost />
              </div>
            </div>

            <Link to={`/postDetail/${post.id}`}>
              <div className="h3-bold py-10">
                <p>{post.title}</p>
              </div>
              <div>
                <p>{post.description}</p>
              </div>
            </Link>
            <div className="p-5 mt-5">
              {post.attachments &&  (
                  <VideoLayout videos={post.attachments} />
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypostDetail;

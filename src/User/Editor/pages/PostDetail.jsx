import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostDetail, resetPostData } from "../../../Redux/Store/postSlice";
import {
  formatDateString,
  stringAvatar,
} from "../../../constants/Editor/utils/formater";
import { Avatar, AvatarGroup } from "@mui/material";
import PostAction from "../../../Components/User/Utils/PostAction";
import Loader from "../../../Components/User/Utils/Loader";
import { sendRequest } from "../../../Axios/UserServer/UserServer";
import { Request } from "../../../Redux/Store/RequestSlice";

const postDetail = () => {
  const { post, status, error } = useSelector((state) => state.postDetails);
  const { profile } = useSelector((state) => state.userData);
  const usertoken = useSelector((state) => state.usertoken);
  const { req } = useSelector((state) => state.request);
  const [postData, setPostData] = useState(post.post ? post.post : post);
  const [attachment, setAttachment] = useState(
    post.editor_request ? post.editor_request : null
  );
  const [activity, setActivity] = useState(false);
  const [buttonS, setButtonS] = useState('Request')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleRequest = async (id) => {
    const post = id;
    console.log(post);
    const response = await sendRequest({ post });
    console.log(response);
    setActivity(!activity);
    setButtonS('Requested')
    // dispatch(requestData(response))
  };

  useEffect(() => {
    dispatch(Request());
    dispatch(PostDetail(id));
    console.log("attachhh", attachment);
    console.log(post);
    // setPostData(post.post)
    console.log(postData);

    return () => {
      // dispatch(resetPostData());
    }
    
  }, [activity]);

  if (status === "Loading") {
    return <Loader />;
  }

  const handleDownloadAll = (attachments) => {
    attachments.forEach((attachment) => {
      // Assuming attachment.files is the URL of the file
      const fileUrl = attachment.files;

      // Create an anchor element
      const anchor = document.createElement("a");
      anchor.href = fileUrl;

      // Set the download attribute to force download
      anchor.download = fileUrl.split("/").pop();

      // Append the anchor to the body
      document.body.appendChild(anchor);

      // Trigger a click event to start the download
      anchor.click();

      // Remove the anchor from the body
      document.body.removeChild(anchor);
    });
  };

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-post ">
          <div className="flex w-full flex-col min-h-fit rounded-xl bg-dark-4 p-20 relative">
            <div className="flex items-start justify-between">
              <div className="flex w-full flex-1 flex-row gap-3">
                {postData.user && (
                  <Link>
                    <Avatar
                      {...stringAvatar(`${postData.user.username}`)}
                      className="capitalize"
                    />
                  </Link>
                )}
                <div className="flex flex-col">
                  {postData.user && (
                    <p className="base-medium lg:body-bold text-light-1 capitalize">
                      {postData.user.username}
                    </p>
                  )}
                  <div className="flex-center gap-2 text-light-3">
                    {postData.created_at && (
                      <p className="subtle-semibold lg:small-regular">
                        {formatDateString(postData.created_at)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {postData.id && (
              <Link to={`/postDetail/${postData.id}`}>
                <div className="h2-bold py-10">
                  <p>{postData?.title}</p>
                </div>
                <div className="h4-bold py-10">{postData.titleDesc}</div>
                <div>
                  <p>{postData?.description}</p>
                </div>
              </Link>
            )}

            <div className="flex flex-1 items-end">
              {!attachment ? (
                <button
                  onClick={() => handleRequest(postData.id)}
                  className="bg-gray-800 p-3 h-14 w-36 rounded-lg mt-6 hover:bg-primary-500"
                >
                  {buttonS}
                </button>
              ) : attachment.accepted === true ? (
                <>
                  <button
                    className="bg-gray-800 p-3 h-14 w-36 rounded-lg mt-6 hover:bg-primary-500"
                    onClick={() => handleDownloadAll(postData.attachments)}
                  >
                    Download
                  </button>
                  <Link to={`/chatEditor`}>
                    <button className="bg-gray-800 p-3 h-14 w-36 ml-3 rounded-lg mt-6 hover:bg-primary-500">
                      Chat
                    </button>
                  </Link>
                </>
              ) : (
                <p className="bg-gray-800 p-3 h-14 w-36 rounded-lg mt-6 flex  items-center justify-center">Requested</p>
                
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default postDetail;

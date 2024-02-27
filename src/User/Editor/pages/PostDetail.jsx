import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostDetail } from "../../../Redux/Store/postSlice";
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
  useEffect(() => {
    dispatch(PostDetail(id));
    dispatch(Request())
    console.log(post);
  }, []);

  const { req } = useSelector((state) => state.request)
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.usertoken);
  const { post, status, error } = useSelector((state) => state.postDetails);
  const { profile } = useSelector((state) => state.userData);

  // const [Request, setRequest] = useState(post.attachments? true:false)

  console.log(req)
  if (status === "Loading") {
    return <Loader />;
  }

  const handleDownloadAll = (attachments) => {
    attachments.forEach((attachment) => {
      // Assuming attachment.files is the URL of the file
      const fileUrl = attachment.files;
  
      // Create an anchor element
      const anchor = document.createElement('a');
      anchor.href = fileUrl;
      
      // Set the download attribute to force download
      anchor.download = fileUrl.split('/').pop();
      
      // Append the anchor to the body
      document.body.appendChild(anchor);
      
      // Trigger a click event to start the download
      anchor.click();
      
      // Remove the anchor from the body
      document.body.removeChild(anchor);
    });
  };


  const handleRequest =async(id) => {
    const editor =profile.user.id
    const post = id
    console.log(editor,post);
    const response = await sendRequest({post,editor})
    if (response.status === 200){
    }
  }
  

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-post ">
          <div className="flex w-full flex-col min-h-fit rounded-xl bg-dark-4 p-20 relative">
            <div className="flex items-start justify-between">
              <div className="flex w-full flex-1 flex-row gap-3">
                {post.user && (
                  <Link>
                    <Avatar
                      {...stringAvatar(`${post.user.username}`)}
                      className="capitalize"
                    />
                  </Link>
                )}
                <div className="flex flex-col">
                  {post.user && (
                    <p className="base-medium lg:body-bold text-light-1 capitalize">
                      {post.user.username}
                    </p>
                  )}
                  <div className="flex-center gap-2 text-light-3">
                    {post.created_at && (
                      <p className="subtle-semibold lg:small-regular">
                        {formatDateString(post.created_at)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {post.id && (
              <Link to={`/postDetail/${post.id}`}>
                <div className="h3-bold py-10">
                  <p>{post.title}</p>
                </div>
                <div>
                  <p>
                    In publishing and graphic design, Lorem ipsum (/ˌlɔː.rəm
                    ˈɪp.səm/) is a placeholder text commonly used to demonstrate
                    the visual form of a document or a typeface without relying
                    on meaningful content. Lorem ipsum may be used as a
                    placeholder before the final copy is available. It is also
                    used to temporarily replace text in a process called
                    greeking, which allows designers to consider the form of a
                    webpage or publication, without the meaning of the text
                    influencing the design. Lorem ipsum is typically a corrupted
                    version of De finibus bonorum et malorum, a 1st-century BC
                    text by the Roman statesman and philosopher Cicero, with
                    words altered, added, and removed to make it nonsensical and
                    improper Latin. The first two words themselves are a
                    truncation of dolorem ipsum ("pain itself"). Versions of the
                    Lorem ipsum text have been used in typesetting at least
                    since the 1960s, when it was popularized by advertisements
                    for Letraset transfer sheets.
                  </p>
                  {/* <p>{post.description}</p> */}
                </div>
              </Link>
            )}

            <div className=" flex flex-1 items-end ">
              {!post.attachments ? (
                <button
                onClick={()=> handleRequest(post.id)}
                  className="bg-gray-800 p-3 h-14 w-36  rounded-lg mt-6 hover:bg-primary-500 "
                >
                  Request
                </button>
              ) : (
                <button
                  className="bg-gray-800 p-3 h-14 w-36  rounded-lg mt-6 hover:bg-primary-500 "
                  onClick={() => handleDownloadAll(post.attachments)}
                  >
                  download
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default postDetail;

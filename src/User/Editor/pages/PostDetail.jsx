import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
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
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import UploadVideo from "../../../Components/User/Utils/Upload";
import { Flex } from "antd";

const postDetail = () => {
  const { post, status, error } = useSelector((state) => state.postDetails);
  const { profile } = useSelector((state) => state.userData);
  const usertoken = useSelector((state) => state.usertoken);
  const { req } = useSelector((state) => state.request);
  const [postData, setPostData] = useState(post.post ? post.post : post);
  const [attachment, setAttachment] = useState(
    post.editor_request ? post.editor_request : null
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activity, setActivity] = useState(false);
  const [buttonS, setButtonS] = useState("Request");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    description: "",
    files: [],
  });

  const handleRequest = async (id) => {
    const post = id;
    console.log(post);
    const response = await sendRequest({ post });
    console.log(response);
    setActivity(!activity);
    setButtonS("Requested");
    // dispatch(requestData(response))
  };

  useEffect(() => {
    dispatch(Request());
    dispatch(PostDetail(id));
  }, [id]);

  useEffect(() => {
    setPostData(post.post ? post.post : post);
  }, [post.post, post]);

  useEffect(() => {
    setAttachment(post.editor_request ? post.editor_request : null);
  }, [post.editor_request]);

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

  const handleFileChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setFormData((prevData) => ({ ...prevData, files: files }));
  }, []);

  const handleForm = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  if (status === "Loading") {
    return <Loader />;
  }
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
                  <button
                    onClick={onOpen}
                    className="bg-gray-800 p-3 h-14 w-36 ml-3 rounded-lg mt-6 hover:bg-primary-500"
                  >
                    Submit
                  </button>
                </>
              ) : (
                <p className="bg-gray-800 p-3 h-14 w-36 rounded-lg mt-6 flex  items-center justify-center">
                  Requested
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        backdrop={"blur"}
        className="bg-dark-3 p-10"
        isOpen={isOpen}
        size={"3xl"}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Submit work
              </ModalHeader>
              <ModalBody>
                <Flex vertical gap={20}>
                    <UploadVideo handleFileChange={handleFileChange} />
                  Description:
                  <textarea
                    name="description"
                    value={formData.description}
                    showCount
                    maxLength={1000}
                    onChange={handleForm}
                    placeholder=""
                    style={{
                      height: 120,
                      resize: "none",
                    }}
                    className="shad-textarea "
                    />
                  Quation:
                  <input
                    className="shad-input rounded-lg w-2/6"
                    showCount
                    maxLength={400}
                    name="titleDesc"
                    style={{ height: 50 }}
                    value={formData.titleDesc}
                    onChange={handleForm}
                    />
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Dismiss
                </Button>
                <Button color="primary" onPress={onClose}>
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default postDetail;

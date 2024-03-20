import React, { useCallback, useState } from "react";
import { Flex, Result } from "antd";
import { useParams } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { axiosInstanceUser } from "../../../Axios/Utils/axiosInstance";
import { useSelector } from "react-redux";
import { Delete } from "../../../Axios/UserServer/UserServer";

const Success = () => {
    const { post } = useSelector((state)=> state.request)
    const { vid_key } = useSelector((state)=> state.upload)
    const { ordr, postid } = useParams();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [open, setOpen] = useState(true);
    const [button, setbutton] = useState('post')
    const [formData, setFormData] = useState({
        title: "",
        tags: "",
        description: "",
    });

  const handleForm = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handlePost = async () => {
    if (formData.title.trim() === "" || formData.tags.trim() === "" || formData.description.trim() === "") {
      // Show error message if any of the fields are empty
      toast.error("All fields are required!");
    } else {
        setbutton('Posting....')
        const vdData = new FormData();
        vdData.append('title',formData.title)
        vdData.append('description',formData.description)
        vdData.append('tags',formData.tags)
        vdData.append('vid_key',vid_key)
        
        await axiosInstanceUser.post('/yt/upload/', vdData).catch(error =>{
            console.log(error)
        })
      // Set open to false if all fields are filled
      Delete(postid)
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center h-screen text-white">
      <Modal
        backdrop={"blur"}
        isOpen={open}
        className="bg-dark-3 p-10"
        size={"3xl"}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Video info
              </ModalHeader>
              <ModalBody>
                <Flex vertical gap={20}>
                  Title
                  <input
                    className="shad-input rounded-lg"
                    showCount
                    maxLength={400}
                    name="title"
                    style={{ height: 50 }}
                    value={formData.title}
                    onChange={handleForm}
                  />
                  Tags
                  <input
                    className="shad-input rounded-lg"
                    showCount
                    maxLength={400}
                    name="tags"
                    style={{ height: 50 }}
                    value={formData.tags}
                    onChange={handleForm}
                  />
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
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handlePost}>
                  {button}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Result
        status="success"
        title={
          <span style={{ color: "white" }}>
            Success!! your video will be uploaded soon...
          </span>
        }
        subTitle={
          <span style={{ color: "white" }}>
            Order number: {ordr} server can take up to a minute to upload your data
          </span>
        }
      />
    </div>
  );
};

export default Success;

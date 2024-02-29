import React, { useState } from "react";
import update from '../../../assets/icons/update.svg';
import UpdateForm from "../../../Components/User/Utils/UpdateForm";
import { useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../../Axios/Api/EndPoint";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


const UpdatePost = () => {
  // const [open, setOpen] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  const [UpdtForm, setUpdtForm] = useState([])
  const { id } = useParams();
  const {access} = useSelector((state) => state.usertoken)
  const navigate = useNavigate()

  const handleOk = (updateData) => {
    console.log(updateData);
    setUpdtForm(updateData)
  };

  const handleSubmit = async () =>{
    const postData = new FormData();
    postData.append('title', UpdtForm.title);
    postData.append('description', UpdtForm.description);
    postData.append('titleDesc', UpdtForm.titleDesc);
    UpdtForm.files.forEach((file) => {
      postData.append('files', file);
    });

    console.log(UpdtForm);
    try {
  
      const response = await axios.put(`${API}/updatePost/${id}`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${access}`,
        },
      });
      if (response.status === 200) {
        toast.success('Post Updated');
        navigate('/my_post')
      }
      return response;
    } catch (error) {
      console.log(error);
      toast.error('Error occurred while Updating.');
    }
  }
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <div>
      <button onClick={onOpen}>
        <img src={update} alt="update" height={20} width={20} />
      </button>
      <Modal 
        backdrop={"blur"}
        className="bg-dark-3"
        size={"2xl"} 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update Form</ModalHeader>
              <ModalBody>

              <UpdateForm handleOk={handleOk}/>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={handleSubmit}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>




      {/* <Modal
        width={1000}
        keyboard
        okText='update'
        title="Update Post"
        open={open}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={()=>setOpen(false)}
        okButtonProps={{ style: { backgroundColor: 'green' }, className: 'custom-ok-button' }}
      >
        <UpdateForm handleOk={handleOk}/>
      </Modal> */}
    </div>
  );
};

export default UpdatePost;

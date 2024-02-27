import { Modal } from "antd";
import React, { useState } from "react";
import update from '../../../assets/icons/update.svg';
import UpdateForm from "../../../Components/User/Utils/UpdateForm";
import { useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../../Axios/Api/EndPoint";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const UpdatePost = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [UpdtForm, setUpdtForm] = useState([])
  const { id } = useParams();
  const {access} = useSelector((state) => state.usertoken)

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
    setConfirmLoading(true);
    try {
  
      const response = await axios.put(`${API}/updatePost/${id}`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${access}`,
        },
      });
      if (response.status === 200) {
        toast.success('Post Updated');
      }
      return response;
    } catch (error) {
      console.log(error);
      toast.error('Error occurred while Updating.');
    }finally{
      setOpen(false);
      setConfirmLoading(false);

    }
  }

  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <img src={update} alt="update" height={20} width={20} />
      </button>
      <Modal
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
      </Modal>
    </div>
  );
};

export default UpdatePost;

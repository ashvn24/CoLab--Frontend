import { Modal } from "antd";
import React, { useState } from "react";
import update from '../../../assets/icons/update.svg';
import UpdateForm from "../../../Components/User/Utils/UpdateForm";

const UpdatePost = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataUpdt, setDataUpdt] = useState('')

  const handleOk = (updateData) => {
    
    setDataUpdt(updateData)
  };
  const handleSubmit = async () =>{
    setConfirmLoading(true);
    
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
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
      >
        <UpdateForm handleOk={handleOk}/>
      </Modal>
    </div>
  );
};

export default UpdatePost;

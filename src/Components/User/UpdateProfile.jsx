import React, { useState } from 'react'
import update from  '../../assets/icons/update.svg';
import { Modal } from 'antd';
import ProfileForm from './ProfileForm';

const UpdateProfile = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [proData, setProData] = useState([])
    const handleSubmit =async (UpdateProfile) => {
      setProData(UpdateProfile)
      console.log('reached',proData);
    }
    const onok =() =>{
      setConfirmLoading(true)
      const postData = new FormData();
    postData.append('full_name', proData.full_name);
    postData.append('bio', proData.bio);
    postData.append('channel_link', proData.channel_link);
    postData.append('instagram', proData.instagram);
    postData.append('facebook', proData.facebook);
    postData.append('profile_image',proData.profile_image[0] );
    
    }
  return (
    <div>
      <button onClick={()=>setOpen(true)}>
        <img src={update} alt="update" height={20} width={20} />
      </button>
      <Modal
        width='40%'
        keyboard
        okText='update'
        title="Update Profile"
        open={open}
        onOk={onok}
        confirmLoading={confirmLoading}
        onCancel={()=>setOpen(false)}
        okButtonProps={{ style: { backgroundColor: 'green' }, className: 'custom-ok-button' }}
      >
        <ProfileForm handleSubmit={handleSubmit}/>
      </Modal>
    </div>
  )
}

export default UpdateProfile

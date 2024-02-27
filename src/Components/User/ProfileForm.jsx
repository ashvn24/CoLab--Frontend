import { InfoCircleOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Tooltip, Upload } from 'antd'
import ImgCrop from 'antd-img-crop';
import TextArea from 'antd/es/input/TextArea';
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux';


const ProfileForm = ({ handleSubmit = () => {} }) => {

    const { profile,status,error } = useSelector((state) => state.userData);
    const [UpdateProfile, setUpdateProfile] = useState({
        full_name:profile.full_name || '',
        bio:profile.bio || '',
        channel_link : profile.channel_link || '',
        instagram:profile.instagram || '',
        facebook : profile.facebook || '',
        profile_image:profile.profile_image || ''

    })
    const handleForm = useCallback((e) => {
        const { name, value } = e.target;
        setUpdateProfile((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }, []);
    
    //   console.log('data',UpdateProfile);
    // Handle the file change event
    const [fileList, setFileList] = useState([])

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (fileList.length > 0) {
            const uploadedFile = fileList[0];
            
            setUpdateProfile(prevState => ({
                ...prevState,
                profile_image: uploadedFile // Assuming you want to store the file object itself
            }));
        }
      };
      const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
      };
  return (

    <div className=''>
    <form onSubmit={handleSubmit(UpdateProfile)}>
    <div className="flex flex-1 justify-center items-center mb-1">
        <Form>
    <ImgCrop rotationSlider>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop>
        
        </Form>
        {/* Other form fields */}
    </div>
    <div className="mb-4">
        Full Name:
        <Input
            value={UpdateProfile.full_name}
            showCount
            maxLength={100}
            name="full_name"
            style={{ height: 40 }}
            onChange={handleForm}
        />
    </div>
    <div className="mb-4">
        Bio:
        <TextArea rows={4} 
        value={UpdateProfile.bio}
        onChange={handleForm}
        name='bio'/>
    </div>
    <div className="mb-4">
        Phone:
        <Input defaultValue="91" 
        name='phone'
        onChange={handleForm}
        value={UpdateProfile.phone}/>
    </div>
    <div className="mb-4">
        Youtube:
        <Input
            onChange={handleForm}
            value={UpdateProfile.channel_link}
            name='channel_link'
            placeholder="Enter your channel"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
                <Tooltip title="your youtube channel">
                    <InfoCircleOutlined
                        style={{
                            color: 'rgba(0,0,0,.45)',
                        }}
                        />
                </Tooltip>
            }
            />
    </div>
    <div className="mb-4">
        Instagram:
        <Input
            onChange={handleForm}
            value={UpdateProfile.instagram}
            name='instagram'
            placeholder="Enter your username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
                <Tooltip title="Your instagram user id">
                    <InfoCircleOutlined
                        style={{
                            color: 'rgba(0,0,0,.45)',
                        }}
                        />
                </Tooltip>
            }
            />
    </div>
    <div className="mb-4">
        Facebook:
        <Input
            onChange={handleForm}
            value={UpdateProfile.facebook}
            name='facebook'
            placeholder="Enter your username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
                <Tooltip title="Your facebook id">
                    <InfoCircleOutlined
                        style={{
                            color: 'rgba(0,0,0,.45)',
                        }}
                        />
                </Tooltip>
            }
            />
    </div>
            </form>
</div>

  )
}

export default ProfileForm

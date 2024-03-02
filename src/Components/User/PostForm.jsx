import React, { useCallback, useEffect, useState } from "react";
import UploadVideo from "./Utils/Upload";
import { Flex, Input } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { API } from "../../Axios/Api/EndPoint";
import axios from "axios";
import { Post } from "../../Redux/Store/CreatePostSlice";
import { useNavigate } from "react-router-dom";
import { resetPostState } from "../../Redux/Store/postSlice";
import { Progress } from "@nextui-org/react";


const PostForm = React.memo (() => {

const { TextArea } = Input;
const {access} = useSelector((state) => state.usertoken)
const {post} = useSelector((state) => state.CreatePostData)
const [progres, setProgres] = useState({ started:false, pc:0});
const [uploadComplete, setUploadComplete] = useState(false);
const dispatch = useDispatch()
const navigate = useNavigate()
const [formData, setFormData] = useState({
  title: '',
  description: '',
  titleDesc:'',
  files:[],
});


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

const handleSubmit = useCallback(async () => {
  const postData = new FormData();
  postData.append('title', formData.title);
  postData.append('description', formData.description);
  postData.append('titleDesc', formData.titleDesc);
  formData.files.forEach((file) => {
    postData.append('files', file);
  });

  try {
    setProgres((prevProgress) => ({ ...prevProgress, started: true }));

    const response = await axios.post(`${API}/create_post/`, postData, {
      onUploadProgress: (progressEvent) => {
        const progressPercentage = (progressEvent.loaded / progressEvent.total) * 100;
        setProgres((prevProgress) => ({
          ...prevProgress,
          pc: progressPercentage,
        }));
    
        if (progressPercentage === 100) {
          setUploadComplete(true);
        }
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${access}`,
      },
    });
    if (response.status === 201) {
      toast.success('Post Successful');
      setUploadComplete(false)
      dispatch(Post(response.data));
      navigate('/my_post')

    }
    return response;
  } catch (error) {
    console.log(error);
    toast.error('Error occurred while posting.');
  }finally{
    setFormData({
      title: '',
      description: '',
      files:[],
    })
    dispatch(resetPostState())
  }
}, [formData]);


return (
    <div className="w-2/3  max-sm:w-10/12">
      
      <Flex vertical gap={43}>
      Title:
      <input className="shad-input rounded-lg" showCount maxLength={400} name='title' style={{height:50}} value={formData.title} onChange={handleForm}  />
      Title Desc:
      <input className="shad-input rounded-lg" showCount maxLength={400} name='titleDesc' style={{height:50}} value={formData.titleDesc} onChange={handleForm}  />
      Description:
      <textarea
        name='description'
        value={formData.description}
        showCount
        maxLength={1000}
        onChange={handleForm}
        placeholder=""
        style={{
          height: 120,
          resize: 'none',
        }}
        className='shad-textarea '
      />
       </Flex>
     Upload Media:
    <UploadVideo  handleFileChange={handleFileChange}/>
    {/* { progres.started && <Progress percent={progres.pc} />} */}
    {/* {progres.started &&<Progress
      aria-label="Downloading..."
      size="md"
      value={progres.pc}
      color="success"
      showValueLabel={true}
      className="max-w-full"
    />} */}
    {uploadComplete === true? ( <Progress
      size="md"
      isIndeterminate
      color="warning"
      aria-label="Loading..."
      className="max-w-full mt-3"
    />):(progres.started &&<Progress
      aria-label="Downloading..."
      size="md"
      value={progres.pc}
      color="success"
      showValueLabel={true}
      className="max-w-full"
    />)}
     <div className="flex flex-row gap-5 justify-end max-sm:justify-center ">
     <button type="submit" onClick={() =>{
      setFormData({
      title: '',
      description: '',
      files:[],
    })
  navigate('/indexCreator')}} 
    className='bg-gray-800 p-3 h-14 w-36 rounded-lg mt-6 hover:bg-red'> Cancel</button>
     <button type="submit" onClick={handleSubmit} className='bg-gray-800 p-3 h-14 w-36 rounded-lg mt-6 hover:bg-primary-500'> Submit</button>

     </div>
    </div>
  );
});

export default PostForm;

import axios from "axios";
import { axiosInstanceUser } from "../Utils/axiosInstance";
// import { API } from "../Api/EndPoint";
// import { useSelector } from "react-redux";

export const UserProfile = async () => {
    try {
      const res = await axiosInstanceUser.get(`/profile/`);
      if (res.status === 200) {
        return res;
      } else {
        console.error("Unexpected status code:", res.status);
        return res.statusText;
      }
    } catch (error) {
      return error;
    }
  };
  
  export const VerifyUser = async (otp) => {
    const Otp = { otp };
    try {
      const response = await axiosInstanceUser.post(`/verify/`, Otp);
      return response.data;
    } catch (error) {
      if (error.response.error) {
        return error.response.error;
      } else {
        return error;
      }
    }
  };
  
  export const UserRegister = async (username, email, role, password) => {
    const newUser = {
      username,
      email,
      role,
      password,
    };
    try {
      const response = await axiosInstanceUser.post(`/register/`, newUser);
      return response.data;
    } catch (error) {
      if (error.response.data.error) {
        return error.response.data.error;
      } else {
        return error;
      }
    }
  };

  //get all post as feed for editor
  export const getAllPost = async () => {
    try {
      const response = await axiosInstanceUser.get('/all_post/')
      console.log('response',response);
      if (response.status === 200) {
        return response.data;
    } else {
        console.error('Unexpected status code:', response);
        return response;
    }
    } catch (error) {
      console.log('post',error);
    }
  }

  //get all post of creator_upload
export const getMyPost = async () => {
  try{
  const response = await axiosInstanceUser.get('/get_mypost/');
  return response.data;
  }catch(error){
    console.log(error);
  }
}
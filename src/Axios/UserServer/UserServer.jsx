import axios from "axios";
import { axiosInstanceUser } from "../Utils/axiosInstance";
// import { API } from "../Api/EndPoint";
// import { useSelector } from "react-redux";

export const UserProfile = async () => {
    try {
      const res = await axiosInstanceUser.get(`/profile/`);
      if (res.status === 200) {
        // Assuming the response contains users data
        return res;
      } else {
        // Handle unexpected status code
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

  // export const createPostInstance = async(formData) => {
  //   // const {title,description, upload} =formData
  //   // console.log('files',title,description,files);
  //   // const files=upload
  //   const {access} = useSelector((state) => state.usertoken)
  //   try {
  //     const response = await axios.post(`${API}/create_post/`,formData, {
  //       headers:{
  //         "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
  //         "Authorization": `Bearer ${access}`
  //       }
  //     });
  //     return response.data
  //   } catch (error) {
  //     console.log(error);
  //     return error
  //   }
  // }
  
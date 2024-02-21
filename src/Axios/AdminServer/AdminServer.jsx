import { axiosInstance } from "../Utils/axiosInstance";

export const listUserslist = async()=>{

        // const jwtToken = access
        const res = await axiosInstance.get(`/admin/allUsers/`);
        if (res.status === 200) {
            // Assuming the response contains users data
            return res.data;
        } 
}

export const UserStatus = async(id)=>{
    try {

        const user_id ={id}
        const res = await axiosInstance.post(`/admin/allUsers/`,user_id);
        if (res.status === 200) {
            // Assuming the response contains users data
            return res;
        } else {
            // Handle unexpected status code
            console.error('Unexpected status code:', res.status);
            return res.statusText;
        }

    } catch (error) {
        return error
    }
}
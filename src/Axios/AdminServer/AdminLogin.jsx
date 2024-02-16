import axios from "axios";
import { API } from "../Api/EndPoint";

export const AdminResponse =async (email,password)=>{
    try {
        const response = await axios.post(`${API}/admin/login/`, {
            email,
            password,
        });
        const access = response.data.access_token;
        const refresh = response.data.refresh_token;
        const user = response.data.role
        console.log('User data:', user);
        const authdata = { 'access': access, 'refresh': refresh};
        return authdata;
    } catch (error) {
        error = { 'error': 'Authentication Failed' };
        return error;
    }
}
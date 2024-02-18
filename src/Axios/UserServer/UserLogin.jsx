import axios from "axios";
import { API } from "../Api/EndPoint";

export const LoginResponse =async (email,password)=>{
    try {
        const response = await axios.post(`${API}/login/`, {
            email,
            password,
        });
        const access = response.data.access_token;
        const refresh = response.data.refresh_token;
        const user = response.data
        const username = response.data.username
        const Email = response.data.email
        const authdata = { 'access': access, 'refresh': refresh, 'user': user, 'username':username, 'email':Email };
        return authdata;
    } catch (error) {
        error = { 'error': 'Authentication Failed' };
        return error;
    }
}

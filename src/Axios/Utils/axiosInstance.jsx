import axios from "axios";
import { API } from "../Api/EndPoint";
import { store } from "../../Redux/Store/Store";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

export const axiosInstance = axios.create({
    baseURL: API,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    async function (config) {
        const state = store.getState();
        const accessToken = state.AdminToken.access;
        const refreshToken = state.AdminToken.refresh;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            const user = jwtDecode(accessToken)
            const isExp = dayjs.unix(user.exp).diff(dayjs()) < 1
            if(isExp){
                const res = await axios.post(`${API}/token/refresh`,{refresh: refreshToken})
                if (res.status === 200){
                    config.headers.Authorization = `Bearer ${res.data.access}`;
                }else{
                    console.log(res);
                }
            }
        } else {
            // Handle the case when there's no access token
            // For example, you might want to redirect to login page
            console.log('error in store');
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const axiosInstanceUser = axios.create({
    baseURL: API,
    headers: {
        'Content-Type': 'application/json'
    }
});



axiosInstanceUser.interceptors.request.use(
    async function (config) {
        const state = store.getState();
        const accessToken = state.usertoken.access;
        const refreshToken = state.usertoken.refresh;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            const user = jwtDecode(accessToken)
            const isExp = dayjs.unix(user.exp).diff(dayjs()) < 1
            console.log('expp',isExp);
            if(isExp){
                const res = await axios.post(`${API}/token/refresh`,{refresh: refreshToken})
                if (res.status === 200){
                    console.log('refresh',res);
                    config.headers.Authorization = `Bearer ${res.data.access}`;
                }else{
                    console.log(res);
                }
            }
        } else {
            // Handle the case when there's no access token
            // For example, you might want to redirect to login page
            console.log('no access token');
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);


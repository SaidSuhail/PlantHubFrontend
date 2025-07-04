import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:'https://localhost:7297/api',
    headers:{
        'Content-Type':'application/json',
    },
});

axiosInstance.interceptors.request.use(
    config=>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error=>Promise.reject(error)
)
 import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : 'http://localhost:8002',
    withCredentials : true,
    headers:{
        "Content-Type":"application/json"
    }

})

export default axiosInstance
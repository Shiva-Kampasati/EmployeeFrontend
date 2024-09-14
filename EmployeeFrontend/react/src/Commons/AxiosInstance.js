import axios from "axios"

export const AxiosInstance =(headers)=>{
    let axiosInstance = axios.create({
        baseURL:`${process.env.REACT_APP_URL}/`, timeout:180000,headers:{headers}
    })
    
    return axiosInstance
}
import axios from "axios";
import { useEffect } from "react";

const useAxios = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
})

const useAxiosSecure = () => {
    useEffect(() => {
        useAxios.interceptors.request.use(res => {
            return res;
        }, err => {
            if (err.response.status === 401 || err.response.status === 402) {
                console.log("Log out the user")
            }
        })
    }, [])
    return useAxios
};

export default useAxiosSecure;
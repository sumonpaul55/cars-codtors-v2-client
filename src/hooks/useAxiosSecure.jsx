import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

const useAxios = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
})

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext)
    useEffect(() => {
        useAxios.interceptors.request.use(res => {
            return res;
        }, err => {
            if (err.response.status === 401 || err.response.status === 402) {
                logOut()
                    .then(<Navigate to="/login"></Navigate>)
            }
        })
    }, [logOut])
    return useAxios
};

export default useAxiosSecure;
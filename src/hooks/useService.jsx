import { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useService = () => {
    const [services, setService] = useState([])
    const useAxios = useAxiosSecure();
    useEffect(() => {
        const url = "/services"
        useAxios.get(url)
            .then(res => {
                setService(res.data)
            })
    }, [useAxios])
    return services
};

export default useService;
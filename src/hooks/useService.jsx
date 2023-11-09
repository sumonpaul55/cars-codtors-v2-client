import { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useService = (assend, search) => {
    const [services, setService] = useState([])
    const useAxios = useAxiosSecure();
    useEffect(() => {
        const url = `/services?sort=${assend ? "assend" : "dessend"}&search=${search}`
        useAxios.get(url)
            .then(res => {
                setService(res.data)
            })
    }, [useAxios, assend, search])
    return services
};

export default useService;
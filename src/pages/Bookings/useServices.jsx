import { useEffect, useState } from "react";


const useServices = () => {
    const [service, setServices] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => {
                setServices(data)
            })
    }, [])
    return service

};

export default useServices;
// import { useEffect, useState } from "react";
// import useServices from "../../Bookings/useServices";
import { useState } from "react";
import useService from "../../../hooks/useService";
import ServiceCard from "./ServiceCard";


const Services = () => {
    // const [services, setServices] = useState([]);
    const [assend, setAsend] = useState(true)
    const [search, setSearch] = useState("")
    const services = useService(assend, search);
    // useEffect(() => {
    //     fetch('https://car-doctor-server-ked7okhsh-sumonpaul55s-projects.vercel.app/services')
    //         .then(res => res.json())
    //         .then(data => setServices(data));
    // }, [])
    const handleSerach = e => {
        e.preventDefault();
        setSearch(e.target.search.value)
    }
    return (
        <div className="mt-4">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-orange-600">Our Services</h3>
                <h2 className="text-5xl">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
                <div className="mt-4">
                    <button className="btn btn-secondary" onClick={() => setAsend(!assend)}>{assend ? "Low To High" : "High To Low"}</button>
                    <div className="mt-4">
                        <form onSubmit={handleSerach}>
                            <input type="text" placeholder="search" name="search" className="p-1" />
                            <input type="submit" value="Search" className="btn btn-secondary" />
                        </form>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;
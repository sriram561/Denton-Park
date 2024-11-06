import React from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom"; 
import { IoFastFoodOutline, IoTicketSharp } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { SiReactos } from "react-icons/si";
import { FaCar, FaCamera, FaWheelchair } from "react-icons/fa"; 
import { MdOutlinePayment } from "react-icons/md";
import AdminVehicles from './AdminVehicles';
import AdminWheelChair from './AdminWheelChair';
import AdminFeedback from './AdminFeedback';
import AdminPhotographers from './AdminPhotographers';

const Rides = () => <div>Rides Component</div>;
const Dining = () => <div>Dining Component</div>;
const Photographers = () => <div>Photographers Component</div>;
const Wheelchairs = () => <div>Wheelchairs Component</div>;
const ContactUs = () => <div>Contact Us Component</div>;
const Transactions = () => <div>Transactions Component</div>;
const TicketBooking = () => <div>Ticket Booking Component</div>;

const ServicesData = [
    { id: 1, title: "Rides", path: "/admin-rides", component: <Rides />, icon: <SiReactos /> },
    { id: 2, title: "Dining", path: "/admindining", component: <Dining />, icon: <IoFastFoodOutline /> },
    { id: 3, title: "Vehicles", path: "/admin-vehicles", component: <AdminVehicles />, icon: <FaCar /> }, 
    { id: 4, title: "Photographers", path: "/photographers", component: <AdminPhotographers />, icon: <FaCamera /> },
    { id: 5, title: "Wheelchairs", path: "/admin-wheelchairs", component: <AdminWheelChair />, icon: <FaWheelchair /> },
    { id: 6, title: "Contact Us", path: "/contact-us", component: <AdminFeedback />, icon: <BiSupport /> },
    { id: 7, title: "Transactions", path: "/transactions", component: <Transactions />, icon: <MdOutlinePayment /> },
    { id: 8, title: "Ticket Booking", path: "/ticket-booking", component: <TicketBooking />, icon: <IoTicketSharp /> },
];

function Landing() {
    const navigate = useNavigate(); 

    return (
        <div className='h-screen'>
            <div className="flex flex-col">
                <div className="top flex text-4xl items-center justify-center bg-yellow-400 w-full h-[15vh]">ADMIN PORTAL</div>
                <div className='maincomponent w-full h-[85vh] flex '>
                    <div className="left w-[25%] h-full flex flex-col overflow-y-auto overflow-x-hidden">
                        {ServicesData.map((service) => (
                            <div
                                key={service.id}
                                className="bg-black text-yellow-300 border border-yellow-300 flex flex-col items-center justify-center p-2 cursor-pointer"
                                onClick={() => navigate(service.path)}
                            >
                                <div className="text-2xl mb-4">{service.icon}</div>
                                <h1 className="text-lg font-semibold text-center px-1 flex-grow">
                                    {service.title}
                                </h1>
                            </div>
                        ))}
                    </div>
                    <div className="right w-[80%] p-4 bg-white overflow-y-auto">
                        <Routes>
                            {ServicesData.map((service) => (
                                <Route key={service.id} path={service.path} element={service.component} />
                            ))}
                            <Route path="/" element={<Rides />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;

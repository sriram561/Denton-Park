import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import { db } from '../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

const LandRides = () => {
    const { addToCart } = useContext(CartContext);
    const [rides, setRides] = useState([]);

    useEffect(() => {
        const fetchRides = async () => {
            const ridesCollection = collection(db, 'landRides');
            const rideSnapshot = await getDocs(ridesCollection);
            const rideList = rideSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRides(rideList);
        };

        fetchRides();
    }, []);

    const handleAddToCart = (ride) => {
        addToCart(ride);
        alert(`${ride.title} has been added to the cart.`);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex bg-gray-300 h-[20vh] w-full items-center justify-center">
                <h1 className="m-5 text-black font-bold text-4xl">Book Land Rides Now</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 w-full">
                {rides.map((ride) => (
                    <div key={ride.id} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
                        <img className="w-full h-48 object-cover" src={ride.imgSrc} alt={ride.title} />
                        <div className="p-5">
                            <h1 className="font-bold text-xl text-gray-800">{ride.title}</h1>
                            <p className="text-gray-600">{ride.description}</p>
                            <button 
                                onClick={() => handleAddToCart(ride)} 
                                className="mt-4 w-full p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandRides;

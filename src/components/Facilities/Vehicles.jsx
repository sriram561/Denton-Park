import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import { db } from '../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

const Vehicles = () => {
    const { addToCart } = useContext(CartContext);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            const vehiclesCollection = collection(db, 'vehicles');
            const vehicleSnapshot = await getDocs(vehiclesCollection);
            const vehicleList = vehicleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setVehicles(vehicleList);
        };

        fetchVehicles();
    }, []);

    const handleAddToCart = (vehicle) => {
        addToCart(vehicle);
        alert(`${vehicle.title} has been added to the cart.`);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex bg-gray-300 h-[20vh] w-full items-center justify-center">
                <h1 className="m-5 text-black font-bold text-4xl">Book Vehicles Now</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 w-full">
                {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
                        <img className="w-full h-48 object-cover" src={vehicle.src} alt={vehicle.title} />
                        <div className="p-5">
                            <h1 className="font-bold text-xl text-gray-800">{vehicle.title}</h1>
                            <p className="text-gray-600">Price: {vehicle.price}</p>
                            <p className="text-gray-600">Duration: {vehicle.duration}</p>
                            <button 
                                className="mt-4 w-full p-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-200 ease-in-out"
                                onClick={() => handleAddToCart(vehicle)} 
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

export default Vehicles;

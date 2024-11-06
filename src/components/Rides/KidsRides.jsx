import React, { useEffect, useState, useContext } from 'react'; 
import { CartContext } from '../CartContext';
import { db } from '../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

const KidsRides = () => {
    const { addToCart } = useContext(CartContext);
    const [rides, setRides] = useState([]);

    useEffect(() => {
        const fetchRides = async () => {
            const ridesCollection = collection(db, 'kidsRides');
            const rideSnapshot = await getDocs(ridesCollection);
            const rideList = rideSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRides(rideList);
        };

        fetchRides();
    }, []);

    const handleAddToCart = (ride) => {
        addToCart(ride);
        alert(`${ride.title} has been added to your cart!`);
    };

    return (
        <section className="bg-white h-screen flex items-center justify-center">
            <div className="container h-full pb-14 pt-16 flex flex-col">
                <h1 className="text-4xl font-bold text-left pb-10">Kids Rides</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {rides.map((ride) => (
                        <div key={ride.id} className="bg-[#f4f4f4] rounded-2xl flex flex-col items-center p-4 py-7">
                            <img src={ride.imgSrc} alt={ride.title} className="w-full h-48 object-cover rounded" />
                            <h2 className="text-lg font-semibold text-center px-3">{ride.title}</h2>
                            <p className="text-center px-3">{ride.description}</p>
                            <button
                                onClick={() => handleAddToCart(ride)}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KidsRides;

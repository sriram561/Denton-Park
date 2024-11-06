import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from "../CartContext";
import { db } from '../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

const WheelChair = () => {
    const [wheelchairs, setWheelchairs] = useState([]);
    const [category, setCategory] = useState('handicapped');
    const { addToCart } = useContext(CartContext); 

    useEffect(() => {
        fetchWheelchairs();
    }, [category]);

    const fetchWheelchairs = async () => {
        const wheelchairsCollection = collection(db, category === 'handicapped' ? 'handicappedWheelchairs' : 'oldPeopleWheelchairs');
        const wheelchairSnapshot = await getDocs(wheelchairsCollection);
        const wheelchairList = wheelchairSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWheelchairs(wheelchairList);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value); 
    };

    const handleAddToCart = (wheelchair) => {
        addToCart(wheelchair);
        alert(`${wheelchair.title} has been added to your cart!`); 
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex bg-gray-300 h-[20vh] w-full items-center justify-center">
                <h1 className="m-5 text-gray-600 font-bold text-4xl">Book Wheelchairs Now</h1>
            </div>

            <div className="mb-4">
                <label className="mr-2">Select Category:</label>
                <select value={category} onChange={handleCategoryChange} className="border rounded px-2 py-1">
                    <option value="handicapped">Handicapped Wheel Chairs</option>
                    <option value="oldPeople">Old People Wheel Chairs</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 w-full">
                {wheelchairs.map(wheelchair => (
                    <div key={wheelchair.id} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
                        <img className="w-full h-48 object-contain" src={wheelchair.src} alt={wheelchair.title} />
                        <div className="p-5">
                            <h1 className="font-bold text-xl text-gray-800">{wheelchair.title}</h1>
                            <p className="text-gray-600">Price: {wheelchair.price}</p>
                            <p className="text-gray-600">Duration: {wheelchair.duration}</p>
                            <button 
                                className="mt-4 w-full p-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-200 ease-in-out"
                                onClick={() => handleAddToCart(wheelchair)} 
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

export default WheelChair;

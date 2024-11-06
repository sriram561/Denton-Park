import React, { useEffect, useState, useContext } from 'react';
import { db } from '../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import { CartContext } from "../CartContext";  

const Menu = () => {
    const [oliveGreenDishes, setOliveGreenDishes] = useState([]);
    const [tasteOfIndiaDishes, setTasteOfIndiaDishes] = useState([]);
    const [phothinDishes, setPhothinDishes] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState('oliveGreen'); 
    const { addToCart } = useContext(CartContext); 

    useEffect(() => {
        const fetchDishes = async () => {
            
            const oliveGreenCollection = collection(db, 'oliveGreenDishes');
            const oliveGreenSnapshot = await getDocs(oliveGreenCollection);
            setOliveGreenDishes(oliveGreenSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

           
            const tasteOfIndiaCollection = collection(db, 'tasteOfIndiaDishes');
            const tasteOfIndiaSnapshot = await getDocs(tasteOfIndiaCollection);
            setTasteOfIndiaDishes(tasteOfIndiaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            
            const phothinCollection = collection(db, 'phothinDishes');
            const phothinSnapshot = await getDocs(phothinCollection);
            setPhothinDishes(phothinSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchDishes();
    }, []);

    const handleRestaurantChange = (restaurant) => {
        setSelectedRestaurant(restaurant);
    };

    const handleAddToCart = (item) => {
        addToCart(item);
        alert(`${item.name} has been added to your cart.`);
    };

   
    const renderDishes = () => {
        const dishes = {
            oliveGreen: oliveGreenDishes,
            tasteOfIndia: tasteOfIndiaDishes,
            phothin: phothinDishes,
        }[selectedRestaurant];

        return dishes.map((dish) => (
            <div key={dish.id} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
                <img className="w-full h-48 object-cover" src={dish.src} alt={dish.name} />
                <div className="p-5">
                    <h1 className="font-bold text-xl text-gray-800">{dish.name}</h1>
                    <p className="text-gray-600">Price: ${dish.price}</p>
                    <button
                        onClick={() => handleAddToCart(dish)}
                        className="mt-2 w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transition duration-200 ease-in-out"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        ));
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Menu</h1>

            {}
            <div className="flex space-x-4 mb-4">
                <button onClick={() => handleRestaurantChange('oliveGreen')} className={`p-2 rounded ${selectedRestaurant === 'oliveGreen' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Olive & Green</button>
                <button onClick={() => handleRestaurantChange('tasteOfIndia')} className={`p-2 rounded ${selectedRestaurant === 'tasteOfIndia' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Taste of India</button>
                <button onClick={() => handleRestaurantChange('phothin')} className={`p-2 rounded ${selectedRestaurant === 'phothin' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Phothin</button>
            </div>

            {}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {renderDishes()}
            </div>
        </div>
    );
};

export default Menu;

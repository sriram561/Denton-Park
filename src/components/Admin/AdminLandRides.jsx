import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const AdminLandRides = () => {
    const [rides, setRides] = useState([]);
    const [newRide, setNewRide] = useState({
        imgSrc: '',
        title: '',
        description: ''
    });
    const [editRideId, setEditRideId] = useState(null);

    useEffect(() => {
        fetchRides();
    }, []);

    const fetchRides = async () => {
        const ridesCollection = collection(db, 'landRides');
        const rideSnapshot = await getDocs(ridesCollection);
        const rideList = rideSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRides(rideList);
    };

    const handleAddInitialRides = async () => {
        const initialRides = [
            {
                imgSrc: "https://funderlandpark.com/wp-content/uploads/2016/09/boy-carousel_11a9346e0a8e072646ba660ee773664c.jpg",
                title: "Classic Carousel",
                description: "Enjoy a classic carousel ride with beautiful horses and gentle music!"
            },
            {
                imgSrc: "https://media.istockphoto.com/id/186293315/photo/looping-roller-coaster.jpg?s=612x612&w=0&k=20&c=r0Uq8QvhEjoFOodlgaD_5gMOYOF4rbFxKIp6UOFrcJA=",
                title: "Ferris Wheel",
                description: "Get a bird's eye view of the park from our giant Ferris wheel!"
            },
            {
                imgSrc: "https://i.pinimg.com/564x/c8/34/0d/c8340d31ef696a16319515bb53bd340d.jpg",
                title: "Gentle Roller Coaster",
                description: "A smooth and gentle roller coaster perfect for the whole family!"
            },
        ];

        for (const ride of initialRides) {
            await addDoc(collection(db, 'landRides'), ride);
        }
        fetchRides();
    };

    const handleDeleteRide = async (id) => {
        try {
            await deleteDoc(doc(db, 'landRides', id));
            fetchRides(); 
        } catch (error) {
            console.error("Error deleting ride:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRide({ ...newRide, [name]: value });
    };

    const handleAddOrUpdateRide = async (e) => {
        e.preventDefault();
        if (!newRide.imgSrc || !newRide.title || !newRide.description) {
            alert("Please fill in all fields.");
            return;
        }

        if (editRideId) {
            
            await updateDoc(doc(db, 'landRides', editRideId), newRide);
            setEditRideId(null); 
        } else {
            
            await addDoc(collection(db, 'landRides'), newRide);
        }

        setNewRide({ imgSrc: '', title: '', description: '' }); 
        fetchRides(); 
    };

    const handleEditRide = (ride) => {
        setNewRide({
            imgSrc: ride.imgSrc,
            title: ride.title,
            description: ride.description
        });
        setEditRideId(ride.id); 
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Admin Land Rides</h1>

            <button 
                onClick={handleAddInitialRides}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
                Add Initial Rides
            </button>

            <form onSubmit={handleAddOrUpdateRide} className="mb-4">
                <h2 className="text-xl mb-2">{editRideId ? 'Update Ride' : 'Add New Ride'}</h2>
                <input
                    type="text"
                    name="imgSrc"
                    value={newRide.imgSrc}
                    onChange={handleInputChange}
                    placeholder="Image Link"
                    required
                    className="border rounded px-2 py-1 mr-2"
                />
                <input
                    type="text"
                    name="title"
                    value={newRide.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    required
                    className="border rounded px-2 py-1 mr-2"
                />
                <textarea
                    name="description"
                    value={newRide.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                    className="border rounded px-2 py-1 mr-2"
                />
                <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    {editRideId ? 'Update Ride' : 'Add Ride'}
                </button>
            </form>

            <h2 className="text-xl mb-2">Current Rides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rides.map((ride) => (
                    <div key={ride.id} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
                        <img className="w-full h-48 object-cover" src={ride.imgSrc} alt={ride.title} />
                        <div className="p-5">
                            <h1 className="font-bold text-xl text-gray-800">{ride.title}</h1>
                            <p className="text-gray-600">{ride.description}</p>
                            <div className="flex justify-between mt-4">
                                <button 
                                    onClick={() => handleEditRide(ride)} 
                                    className="w-1/2 p-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition duration-200 ease-in-out mr-1"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDeleteRide(ride.id)} 
                                    className="w-1/2 p-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-200 ease-in-out"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminLandRides;

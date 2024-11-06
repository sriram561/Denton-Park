import React, { useEffect, useState } from 'react'; 
import { db } from '../../firebase'; 
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const AdminWaterRides = () => {
    const [rides, setRides] = useState([]);
    const [newRide, setNewRide] = useState({
        img: '',
        title: '',
        description: ''
    });
    const [editRideId, setEditRideId] = useState(null);

    useEffect(() => {
        fetchRides();
    }, []);

    const fetchRides = async () => {
        const ridesCollection = collection(db, 'waterRides');
        const rideSnapshot = await getDocs(ridesCollection);
        const rideList = rideSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRides(rideList);
    };

    const handleAddInitialRides = async () => {
        const initialRides = [
            {
                img: "https://t.ly/hhFgk",
                title: "Wave Pool",
                description: "Splash around in our massive wave pool, perfect for all ages!"
            },
            {
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyXSO0Dje1UrDEVH7UT5jQzEZn3ma-Tjj5EQ&s",
                title: "Lazy River",
                description: "Relax and float along our gentle lazy river ride, perfect for a leisurely day!"
            },
            {
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPpCIgsk7E7o1_TL36HRy4lr7cgfOCHzwKeA&s",
                title: "Tidal Wave",
                description: "Experience the thrill of our giant swing that sends you plummeting into the splash zone!"
            }
        ];

        for (const ride of initialRides) {
            await addDoc(collection(db, 'waterRides'), ride);
        }
        fetchRides(); // Refresh ride list
    };

    const handleDeleteRide = async (id) => {
        try {
            await deleteDoc(doc(db, 'waterRides', id));
            fetchRides(); // Refresh ride list
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
        if (!newRide.img || !newRide.title || !newRide.description) {
            alert("Please fill in all fields.");
            return;
        }

        if (editRideId) {
            // Update existing ride
            await updateDoc(doc(db, 'waterRides', editRideId), newRide);
            setEditRideId(null); // Reset edit state
        } else {
            // Add new ride
            await addDoc(collection(db, 'waterRides'), newRide);
        }

        setNewRide({ img: '', title: '', description: '' }); // Reset form
        fetchRides(); // Refresh ride list
    };

    const handleEditRide = (ride) => {
        setNewRide({
            img: ride.img,
            title: ride.title,
            description: ride.description
        });
        setEditRideId(ride.id); // Set the ID for the ride being edited
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Admin Water Rides</h1>

            <button 
                onClick={handleAddInitialRides}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
                Add Initial Water Rides
            </button>

            <form onSubmit={handleAddOrUpdateRide} className="mb-4">
                <h2 className="text-xl mb-2">{editRideId ? 'Update Ride' : 'Add New Ride'}</h2>
                <input
                    type="text"
                    name="img"
                    value={newRide.img}
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
                <input
                    type="text"
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

            <h2 className="text-xl mb-2">Current Water Rides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rides.map((ride) => (
                    <div key={ride.id} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
                        <img className="w-full h-48 object-cover" src={ride.img} alt={ride.title} />
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

export default AdminWaterRides;

import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const AdminHighRides = () => {
    const [highRides, setHighRides] = useState([]);
    const [newRide, setNewRide] = useState({
        src: '',
        title: '',
        description: ''
    });
    const [editRideId, setEditRideId] = useState(null);

    useEffect(() => {
        fetchHighRides();
    }, []);

    const fetchHighRides = async () => {
        const highRidesCollection = collection(db, 'highRides');
        const highRideSnapshot = await getDocs(highRidesCollection);
        const highRideList = highRideSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHighRides(highRideList);
    };

    const handleAddInitialHighRides = async () => {
        const initialHighRides = [
            {
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Kingda_Ka_tower.jpg/390px-Kingda_Ka_tower.jpg",
                title: "RollerCoaster Tycoon",
                description: "Get ready for the ultimate roller coaster experience with twists, turns, and a breathtaking drop!",
            },
            {
                src: "https://www.intamin.com/wp-content/uploads/2019/09/intamin-amusement-rides-vertical-rides-products-overview-gyro-drop-370x200.jpg",
                title: "Vertical Drop",
                description: "Experience the thrill of falling from a height with a straight drop that will leave you breathless!",
            },
            {
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Chair-O-Planes%2C_night.jpg/330px-Chair-O-Planes%2C_night.jpg",
                title: "Spinning Swing",
                description: "Feel the rush as you swing high above the park while spinning in circles!",
            },
        ];

        for (const ride of initialHighRides) {
            await addDoc(collection(db, 'highRides'), ride);
        }
        fetchHighRides(); 
    };

    const handleDeleteRide = async (id) => {
        try {
            await deleteDoc(doc(db, 'highRides', id));
            fetchHighRides(); 
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
        if (!newRide.src || !newRide.title || !newRide.description) {
            alert("Please fill in all fields.");
            return;
        }

        if (editRideId) {
            
            await updateDoc(doc(db, 'highRides', editRideId), newRide);
            setEditRideId(null);
        } else {
            
            await addDoc(collection(db, 'highRides'), newRide);
        }

        setNewRide({ src: '', title: '', description: '' }); 
        fetchHighRides(); 
    };

    const handleEditRide = (ride) => {
        setNewRide({
            src: ride.src,
            title: ride.title,
            description: ride.description
        });
        setEditRideId(ride.id); 
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Admin High Rides</h1>

            <button 
                onClick={handleAddInitialHighRides}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
                Add Initial High Rides
            </button>

            <form onSubmit={handleAddOrUpdateRide} className="mb-4">
                <h2 className="text-xl mb-2">{editRideId ? 'Update Ride' : 'Add New Ride'}</h2>
                <input
                    type="text"
                    name="src"
                    value={newRide.src}
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

            <h2 className="text-xl mb-2">Current High Rides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {highRides.map((ride) => (
                    <div key={ride.id} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
                        <img className="w-full h-48 object-cover" src={ride.src} alt={ride.title} />
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

export default AdminHighRides;

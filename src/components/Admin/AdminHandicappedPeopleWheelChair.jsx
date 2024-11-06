import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; 
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const AdminHandicappedWheelChair = () => {
    const [wheelchairs, setWheelchairs] = useState([]);
    const [newWheelchair, setNewWheelchair] = useState({
        src: '',
        title: '',
        price: '',
        duration: ''
    });
    const [editWheelchairId, setEditWheelchairId] = useState(null);

    useEffect(() => {
        fetchWheelchairs();
    }, []);

    const fetchWheelchairs = async () => {
        const wheelchairsCollection = collection(db, 'handicappedWheelchairs');
        const wheelchairSnapshot = await getDocs(wheelchairsCollection);
        const wheelchairList = wheelchairSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWheelchairs(wheelchairList);
    };

    const handleAddInitialWheelchairs = async () => {
        const initialWheelchairs = [
            {
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE4EdHFC_e-KkrLXq_SNTc0rbwzPWf9iukYA&s",
                title: "Handicapped Wheel Chair",
                price: "45$",
                duration: "1 day",
            },
            {
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9STMAbS2mwmXbDqrC7DTcvRqfdhyxulxJRA&s",
                title: "Automatic Handicapped Wheel Chair",
                price: "90$",
                duration: "1 day",
            },
            {
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTujHYkQelEeZXllpsnEsaqe6fUNfBZltXu_w&s",
                title: "Comfort-Handicapped Wheel Chair",
                price: "45$",
                duration: "1 day",
            },
        ];

        for (const wheelchair of initialWheelchairs) {
            await addDoc(collection(db, 'handicappedWheelchairs'), wheelchair);
        }
        fetchWheelchairs(); // Refresh wheelchair list
    };

    const handleDeleteWheelchair = async (id) => {
        try {
            await deleteDoc(doc(db, 'handicappedWheelchairs', id));
            fetchWheelchairs(); // Refresh wheelchair list
        } catch (error) {
            console.error("Error deleting wheelchair:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWheelchair({ ...newWheelchair, [name]: value });
    };

    const handleAddOrUpdateWheelchair = async (e) => {
        e.preventDefault();
        if (!newWheelchair.src || !newWheelchair.title || !newWheelchair.price || !newWheelchair.duration) {
            alert("Please fill in all fields.");
            return;
        }

        if (editWheelchairId) {
            // Update existing wheelchair
            await updateDoc(doc(db, 'handicappedWheelchairs', editWheelchairId), newWheelchair);
            setEditWheelchairId(null); // Reset edit state
        } else {
            // Add new wheelchair
            await addDoc(collection(db, 'handicappedWheelchairs'), newWheelchair);
        }

        setNewWheelchair({ src: '', title: '', price: '', duration: '' }); // Reset form
        fetchWheelchairs(); // Refresh wheelchair list
    };

    const handleEditWheelchair = (wheelchair) => {
        setNewWheelchair({
            src: wheelchair.src,
            title: wheelchair.title,
            price: wheelchair.price,
            duration: wheelchair.duration
        });
        setEditWheelchairId(wheelchair.id); // Set the ID for the wheelchair being edited
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Admin Handicapped Wheel Chairs</h1>

            <button 
                onClick={handleAddInitialWheelchairs}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
                Add Initial Wheel Chairs
            </button>

            <form onSubmit={handleAddOrUpdateWheelchair} className="mb-4">
                <h2 className="text-xl mb-2">{editWheelchairId ? 'Update Wheel Chair' : 'Add New Wheel Chair'}</h2>
                <input
                    type="text"
                    name="src"
                    value={newWheelchair.src}
                    onChange={handleInputChange}
                    placeholder="Image Link"
                    required
                    className="border rounded px-2 py-1 mr-2"
                />
                <input
                    type="text"
                    name="title"
                    value={newWheelchair.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    required
                    className="border rounded px-2 py-1 mr-2"
                />
                <input
                    type="text"
                    name="price"
                    value={newWheelchair.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    required
                    className="border rounded px-2 py-1 mr-2"
                />
                <input
                    type="text"
                    name="duration"
                    value={newWheelchair.duration}
                    onChange={handleInputChange}
                    placeholder="Duration"
                    required
                    className="border rounded px-2 py-1 mr-2"
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    {editWheelchairId ? 'Update Wheel Chair' : 'Add Wheel Chair'}
                </button>
            </form>

            <div>
                {wheelchairs.map(wheelchair => (
                    <div key={wheelchair.id} className="flex justify-between items-center border-b py-2">
                        <span>{wheelchair.title}</span>
                        <div>
                            <button onClick={() => handleEditWheelchair(wheelchair)} className="mr-2 text-blue-500">Edit</button>
                            <button onClick={() => handleDeleteWheelchair(wheelchair.id)} className="text-red-500">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminHandicappedWheelChair;

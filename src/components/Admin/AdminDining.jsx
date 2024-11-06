import React from 'react'; 
import { Link } from 'react-router-dom';

const AdminDining = () => {
    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Admin Dining Management</h1>
            <div className="space-y-4">
                <Link 
                    to="/adminolivegreen" 
                    className="inline-block px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                    Manage Olive & Green
                </Link>
                <Link 
                    to="/admintasteofindia" 
                    className="inline-block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                >
                    Manage Taste of India
                </Link>
                <Link 
                    to="/adminphothin" 
                    className="inline-block px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
                >
                    Manage Phothin
                </Link>
            </div>
        </div>
    );
};

export default AdminDining;

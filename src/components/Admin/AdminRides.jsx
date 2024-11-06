import React from 'react';
import { Link } from 'react-router-dom';

const AdminRides = () => {
    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Admin Rides Management</h1>
            <div className="space-y-4">
                <Link to="/adminhighrides" className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Manage High Rides
                </Link>
                <Link to="/adminlandrides" className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                    Manage Dry Rides
                </Link>
                <Link to="/adminwaterrides" className="inline-block px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition">
                    Manage Water Rides
                </Link>
                <Link to="/adminkidsrides" className="inline-block px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">
                    Manage Kids Rides
                </Link>
            </div>
        </div>
    );
};

export default AdminRides;

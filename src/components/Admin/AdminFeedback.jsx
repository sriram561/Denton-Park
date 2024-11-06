import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

function AdminFeedback() {
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'feedback'));
                const feedbackArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFeedbackData(feedbackArray);
            } catch (error) {
                console.error('Error fetching feedback: ', error);
            }
        };

        fetchFeedback();
    }, []);

    return (
        <div className="p-5">
            <h2 className="text-3xl font-bold text-center mb-6">User Feedback</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-3 px-6 bg-gray-200 font-semibold text-gray-700 text-left">Email</th>
                            <th className="py-3 px-6 bg-gray-200 font-semibold text-gray-700 text-left">Feedback</th>
                            <th className="py-3 px-6 bg-gray-200 font-semibold text-gray-700 text-left">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbackData.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center py-4">No feedback available.</td>
                            </tr>
                        ) : (
                            feedbackData.map((feedback) => (
                                <tr key={feedback.id}>
                                    <td className="py-3 px-6 border-b border-gray-200">{feedback.email}</td>
                                    <td className="py-3 px-6 border-b border-gray-200">{feedback.feedback}</td>
                                    <td className="py-3 px-6 border-b border-gray-200">{feedback.timestamp?.toDate().toLocaleString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminFeedback;

import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; 
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

function AdminTransactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'transactions'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const transactionsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTransactions(transactionsData);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="flex flex-col items-center p-5">
            <h1 className="text-3xl font-bold mb-6">Transaction History</h1>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-left">Transaction ID</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-left">Amount</th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-left">Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b">
                            <td className="py-2 px-4 text-gray-700">{transaction.transactionId}</td>
                            <td className="py-2 px-4 text-gray-700">${transaction.amount}</td>
                            <td className="py-2 px-4 text-gray-700">
                                {transaction.timestamp?.toDate().toLocaleString() || "Pending"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminTransactions;

import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import QRCode from 'react-qr-code';
import { db } from '../firebase'; 
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'; 

function CartPage() {
    const { cartItems, removeFromCart } = useCart();
    const [showQRCode, setShowQRCode] = useState(false);
    const [transactionId, setTransactionId] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    const calculateTotalAmount = () => {
        const total = cartItems.reduce((acc, item) => {
            const itemPrice = typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price;
            return acc + (isNaN(itemPrice) ? 0 : itemPrice);
        }, 0);
        setTotalAmount(total.toFixed(2));
    };

    const handlePaymentClick = () => {
        calculateTotalAmount();
        setShowQRCode(true);
        setTransactionId(null);
    };

    const handleGetTransactionId = async () => {
        const dummyTransactionId = `TRANS-${Math.floor(Math.random() * 1000000)}`;
        setTransactionId(dummyTransactionId);

        
        try {
            await addDoc(collection(db, 'transactions'), {
                transactionId: dummyTransactionId,
                amount: totalAmount,
                timestamp: serverTimestamp(),
            });
        } catch (error) {
            console.error('Error adding transaction to Firebase:', error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex bg-gray-300 h-[20vh] w-full items-center justify-center">
                <h1 className="m-5 text-black font-bold text-4xl">Your Cart</h1>
            </div>
            {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 w-full">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img className="w-full h-48 object-cover" src={item.src} alt={item.name} />
                            <div className="p-5">
                                <h1 className="font-bold text-xl text-gray-800">{item.title}</h1>
                                <p className="text-gray-600">Price: ${item.price}</p>
                                {item.duration && <p className="text-gray-600">Duration: {item.duration}</p>}
                                <button
                                    className="mt-4 w-full p-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-200 ease-in-out"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove from Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="mt-5 p-5 bg-gray-100 rounded-lg w-full">
                <h2 className="font-bold text-lg">Total Amount: ${isNaN(totalAmount) ? "0.00" : totalAmount}</h2>
                <button
                    className="mt-4 w-full p-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition duration-200 ease-in-out"
                    onClick={handlePaymentClick}
                >
                    Proceed to Payment
                </button>
                {showQRCode && (
                    <div className="mt-4 flex flex-col items-center">
                        <QRCode value={`Total Amount: $${totalAmount}`} size={128} />
                        <p className="text-gray-600 mt-2">Scan to pay</p>
                        <button
                            className="mt-4 w-full p-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-200 ease-in-out"
                            onClick={handleGetTransactionId}
                        >
                            Get Transaction ID
                        </button>
                        {transactionId && (
                            <div className="mt-4 p-2 text-green-600 font-bold">
                                Payment Successful! Transaction ID: {transactionId}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartPage;

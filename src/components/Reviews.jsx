import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { collection, addDoc, getDocs } from 'firebase/firestore';

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');

   
    useEffect(() => {
        const fetchReviews = async () => {
            const reviewsCollection = collection(db, 'reviews');
            const reviewsSnapshot = await getDocs(reviewsCollection);
            setReviews(reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchReviews();
    }, []);

    
    const handleAddReview = async (e) => {
        e.preventDefault();
        if (!newReview.trim()) return;

        const reviewData = {
            review: newReview
        };
        await addDoc(collection(db, 'reviews'), reviewData);

        
        setReviews([...reviews, { ...reviewData, id: new Date().toISOString() }]);
        setNewReview(''); 
    };

    return (
        <div
            className='flex flex-col justify-around items-center min-h-screen w-full p-5 bg-cover bg-center bg-no-repeat'
            style={{
                backgroundImage: "url('https://img.freepik.com/premium-photo/illustrated-map-amusement-park-with-rollercoasters-water-rides-other-attractions_14117-1055205.jpg')"
            }}
        >
            <div className='give-review flex flex-col w-full max-w-2xl'>
                <div className='flex justify-center items-center p-4 text-4xl'>
                    <h1 className='text-white bg-black m-3 px-4 py-2 rounded-md'>We Value your Words...</h1>
                </div>
                
                <div className="feedback mt-5 w-full bg-white bg-opacity-80 shadow-lg rounded-lg pb-1">
                    <div className='bg-yellow-200 mb-2 p-2 flex items-center justify-center rounded-t-lg'>
                        <h3 className='text-2xl font-semibold text-black'>Write your Review</h3>
                    </div>
                    <form onSubmit={handleAddReview} className='space-y-4 p-4'>
                        <textarea
                            placeholder="Ex: This Hayyin Park is the best place I have spent my time joyfully"
                            className='w-full p-3 border rounded-md focus:outline-none focus:ring-2 h-16'
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                        ></textarea>
                        <button
                            type="submit"
                            className='w-full p-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition'
                        >
                            Post
                        </button>
                    </form>
                </div>
            </div>

            <div className='see-review w-full md:w-[80vw] bg-black bg-opacity-80 rounded-lg mt-10 p-5 overflow-y-auto'>
                <h2 className="text-white text-3xl text-center mb-6">Our User Reviews</h2>
                <div className="flex flex-col gap-4">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-gray-800 bg-opacity-90 text-white p-4 rounded-lg shadow-md"
                        >
                            <p>{review.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Reviews;

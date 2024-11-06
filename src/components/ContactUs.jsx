import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { db } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore';

function ContactUs() {
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email && feedback) {
            try {
                await addDoc(collection(db, 'feedback'), { email, feedback, timestamp: new Date() });
                setEmail('');
                setFeedback('');
                alert('Feedback submitted successfully!');
            } catch (error) {
                console.error('Error submitting feedback: ', error);
            }
        } else {
            alert('Please fill in both email and feedback.');
        }
    };

    return (
        <div 
            className='flex flex-col justify-around items-center min-h-screen w-full p-5 bg-cover bg-center bg-no-repeat'
            style={{
                backgroundImage: "url('https://img.freepik.com/premium-photo/illustrated-map-amusement-park-with-rollercoasters-water-rides-other-attractions_14117-1055205.jpg')"
            }}
        >
            <h2 className='text-4xl font-bold text-white p-3 rounded-xl bg-black mb-6'>Contact Us</h2>

            <div className='flex flex-col md:flex-row justify-around items-start w-full space-y-8 md:space-y-0 md:space-x-8 px-5 bg-opacity-70 bg-black p-5 rounded-lg'>
                <div className="flex flex-col items-center space-y-3 text-yellow-300">
                    <h3 className='text-xl font-semibold'>Connect with Us</h3>
                    <div className="flex space-x-4 text-2xl">
                        <FaFacebook className="hover:text-blue-500 transition duration-200" />
                        <FaTwitter className="hover:text-blue-300 transition duration-200" />
                        <FaInstagram className="hover:text-pink-500 transition duration-200" />
                        <FaLinkedin className="hover:text-blue-700 transition duration-200" />
                    </div>
                </div>

                <div className="text-center md:text-left text-yellow-200">
                    <h3 className='text-xl font-semibold'>Customer Support</h3>
                    <p className='mt-2'>📞 Phone: +1 (999) 887-665</p>
                    <p>📧 Email: dentonpark@gmail.com</p>
                    <p>🕒 Working Hours: Mon - Fri, 9am - 6pm</p>
                </div>

                <div className="text-center md:text-left text-yellow-200">
                    <h3 className='text-xl font-semibold'>Our Address</h3>
                    <p className='mt-2'>123 Main Street,</p>
                    <p>Houston, Texas, 77001</p>
                    <p>United States</p>
                </div>
            </div>

            <div className="feedback mt-10 w-full max-w-2xl bg-white bg-opacity-80 shadow-lg rounded-lg pb-4">
                <div className='bg-yellow-200 mb-2 p-2 flex items-center justify-center rounded-t-lg'>
                    <h3 className='text-2xl font-semibold text-black mb-4'>Submit your Feedback or Raise your Complaint</h3>
                </div>
                <form className='space-y-4 p-4' onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Your Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-3 border rounded-md focus:outline-none focus:ring-2'
                        required 
                    />
                    <textarea 
                        placeholder="Your Feedback" 
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className='w-full p-3 border rounded-md focus:outline-none focus:ring-2 h-32' 
                        required
                    ></textarea>
                    <button 
                        type="submit" 
                        className='w-full p-3 bg-black text-white font-semibold rounded-md'>
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ContactUs;

import React, { useState, useEffect } from "react";
import { db } from '../../firebase';
import { collection, addDoc } from "firebase/firestore";

const BookingForm = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [studentCount, setStudentCount] = useState(0);
    const [adultBirthdayCount, setAdultBirthdayCount] = useState(0);
    const [childBirthdayCount, setChildBirthdayCount] = useState(0);
    const [selectedPackage, setSelectedPackage] = useState("None");
    const [totalAmount, setTotalAmount] = useState(0);

    const adultTicketPrice = 350;
    const childTicketPrice = 300;

    useEffect(() => {
        calculateTotal();
    }, [adultCount, childCount, studentCount, adultBirthdayCount, childBirthdayCount, selectedPackage]);

    const calculateTotal = () => {
        let finalAmount = 0;
        switch (selectedPackage) {
            case "None":
                finalAmount = (adultCount * adultTicketPrice) + (childCount * childTicketPrice);
                break;
            case "Student ID":
                finalAmount = studentCount * 200; 
                break;
            case "Birthday":
                finalAmount = (adultCount * adultTicketPrice) + (childCount * childTicketPrice) 
                    - (adultBirthdayCount * adultTicketPrice + childBirthdayCount * childTicketPrice);
                break;
            default:
                break;
        }
        setTotalAmount(finalAmount);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "bookings"), {
                name,
                date,
                adultCount,
                childCount,
                studentCount,
                adultBirthdayCount,
                childBirthdayCount,
                selectedPackage,
                totalAmount,
            });
            resetForm();
            alert("Booking submitted successfully!");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const resetForm = () => {
        setName("");
        setDate("");
        setAdultCount(0);
        setChildCount(0);
        setStudentCount(0);
        setAdultBirthdayCount(0);
        setChildBirthdayCount(0);
        setSelectedPackage("None");
        setTotalAmount(0);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="fname">Full Name</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            id="fname"
                            placeholder="Your name.."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="appointmentDate">Appointment Date</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="date"
                            id="appointmentDate"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="adultCount">Number of Adults</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="number"
                            id="adultCount"
                            value={adultCount}
                            onChange={(e) => setAdultCount(Number(e.target.value))}
                            min="0"
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="childCount">Number of Children</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="number"
                            id="childCount"
                            value={childCount}
                            onChange={(e) => setChildCount(Number(e.target.value))}
                            min="0"
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="studentCount">Number of Students</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="number"
                            id="studentCount"
                            value={studentCount}
                            onChange={(e) => setStudentCount(Number(e.target.value))}
                            min="0"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="adultBirthdayCount">Adults with Birthday Discount</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="number"
                            id="adultBirthdayCount"
                            value={adultBirthdayCount}
                            onChange={(e) => setAdultBirthdayCount(Number(e.target.value))}
                            min="0"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="childBirthdayCount">Children with Birthday Discount</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="number"
                            id="childBirthdayCount"
                            value={childBirthdayCount}
                            onChange={(e) => setChildBirthdayCount(Number(e.target.value))}
                            min="0"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="package">Select Package</label>
                    </div>
                    <div className="col-75">
                        <select
                            id="package"
                            value={selectedPackage}
                            onChange={(e) => setSelectedPackage(e.target.value)}
                        >
                            <option value="None">None</option>
                            <option value="Student ID">Student ID</option>
                            <option value="Birthday">Birthday</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label>Total Amount</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            value={`$${totalAmount}`}
                            readOnly
                        />
                    </div>
                </div>

                <div className="row">
                    <button 
                        type="submit" 
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "bold",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "15px",
                        }}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;

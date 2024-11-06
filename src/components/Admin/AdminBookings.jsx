import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const querySnapshot = await getDocs(collection(db, "bookings"));
            const bookingsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBookings(bookingsData);
        };
        fetchBookings();
    }, []);

    return (
        <div style={{ width: "90%", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "20px" }}>Bookings</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#f9f9f9" }}>
                <thead>
                    <tr style={{ backgroundColor: "#2c3e50", color: "white", fontWeight: "bold" }}>
                        <th style={tableHeaderStyle}>Name</th>
                        <th style={tableHeaderStyle}>Date</th>
                        <th style={tableHeaderStyle}>Adults</th>
                        <th style={tableHeaderStyle}>Children</th>
                        <th style={tableHeaderStyle}>Students</th>
                        <th style={tableHeaderStyle}>Adult Birthdays</th>
                        <th style={tableHeaderStyle}>Child Birthdays</th>
                        <th style={tableHeaderStyle}>Package</th>
                        <th style={tableHeaderStyle}>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <tr key={booking.id} style={{ borderBottom: "1px solid #ddd", textAlign: "center" }}>
                                <td style={tableCellStyle}>{booking.name}</td>
                                <td style={tableCellStyle}>{booking.date}</td>
                                <td style={tableCellStyle}>{booking.adultCount}</td>
                                <td style={tableCellStyle}>{booking.childCount}</td>
                                <td style={tableCellStyle}>{booking.studentCount}</td>
                                <td style={tableCellStyle}>{booking.adultBirthdayCount}</td>
                                <td style={tableCellStyle}>{booking.childBirthdayCount}</td>
                                <td style={tableCellStyle}>{booking.selectedPackage}</td>
                                <td style={tableCellStyle}>${booking.totalAmount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" style={{ padding: "12px", textAlign: "center", color: "#555" }}>
                                No bookings available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};


const tableHeaderStyle = {
    padding: "12px",
    borderBottom: "2px solid #ddd",
    textAlign: "center",
};

const tableCellStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    color: "#555",
};

export default AdminBookings;

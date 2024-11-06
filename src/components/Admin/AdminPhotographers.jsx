import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; 

const photographersData = [
  { id: 1, name: "Keira Jones", experience: "5 years", price: 200 },
  { id: 2, name: "Millie Bobby Brown", experience: "3 years", price: 150 },
  { id: 3, name: "Alex Russo", experience: "4 years", price: 180 },
];

const AdminPhotographers = () => {
  const [photographers, setPhotographers] = useState(photographersData);
  const [bookings, setBookings] = useState({}); 
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); 

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingPromises = photographersData.map(async (photographer) => {
        const snapshot = await db.collection("photographers").doc(photographer.id.toString()).collection("bookings").get();
        return {
          id: photographer.id,
          bookings: snapshot.docs.map(doc => doc.data())
        };
      });
      const results = await Promise.all(bookingPromises);
      const bookingsObj = results.reduce((acc, curr) => {
        acc[curr.id] = curr.bookings;
        return acc;
      }, {});
      setBookings(bookingsObj);
    };

    fetchBookings();
  }, []);

  const markUnavailable = async (photographerId, date, time) => {
    const startTime = new Date(`${date}T${time}`);
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1); 

    const existingBookings = bookings[photographerId] || [];
    const isConflicting = existingBookings.some(booking => {
      const bookingStart = new Date(`${booking.date}T${booking.time}`);
      const bookingEnd = new Date(bookingStart);
      bookingEnd.setHours(bookingEnd.getHours() + 1);
      return (startTime < bookingEnd) && (endTime > bookingStart);
    });

    if (isConflicting) {
      alert("This time slot is already booked. Please choose a different time.");
      return;
    }

    await db.collection("photographers").doc(photographerId.toString()).collection("bookings").add({
      date: date,
      time: time,
    });
    alert("Booking marked as unavailable.");
    fetchBookings(); 
  };

  const isSlotUnavailable = (photographerId, time) => {
    const existingBookings = bookings[photographerId] || [];
    const currentTime = new Date(`${selectedDate}T${time}`);
    return existingBookings.some(booking => {
      const bookingStart = new Date(`${booking.date}T${booking.time}`);
      const bookingEnd = new Date(bookingStart);
      bookingEnd.setHours(bookingEnd.getHours() + 1);
      return (currentTime >= bookingStart && currentTime < bookingEnd);
    });
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); 
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Portal: Photographers</h2>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold", marginRight: "10px" }}>
          Select Date: 
          <input 
            type="date" 
            value={selectedDate} 
            onChange={handleDateChange} 
            style={{ marginLeft: "10px" }} 
          />
        </label>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {photographers.map((photographer) => (
          <div key={photographer.id} style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9"
          }}>
            <h3 style={{ margin: "0" }}>{photographer.name}</h3>
            <p><strong>Experience:</strong> {photographer.experience}</p>
            <p><strong>Price:</strong> ${photographer.price}</p>
            <h4>Available Time Slots for {selectedDate}:</h4>
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>
              {Array.from({ length: 9 }, (_, index) => {
                const hour = index + 9; 
                const timeString = `${hour.toString().padStart(2, '0')}:00`; 
                const isUnavailable = isSlotUnavailable(photographer.id, timeString);

                return (
                  <div key={timeString} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{timeString} - {hour + 1}:00</span>
                    {isUnavailable ? (
                      <span style={{ color: "red", marginLeft: "10px", fontWeight: "bold" }}>Unavailable</span>
                    ) : (
                      <button
                        style={{
                          backgroundColor: "#28a745",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          padding: "5px 10px",
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          markUnavailable(photographer.id, selectedDate, timeString);
                        }}
                      >
                        Mark Unavailable
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPhotographers;

import React, { useState } from "react";
import { db } from "../../firebase"; 
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const photographers = [
  { id: 1, name: "Keira Jones", experience: "5 years", price: 200, available: true },
  { id: 2, name: "Millie Bobby Brown", experience: "3 years", price: 150, available: false },
  { id: 3, name: "Alex Russo", experience: "4 years", price: 180, available: true },
];

const BookPhotographer = () => {
  const [selectedPhotographer, setSelectedPhotographer] = useState(null);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [isSlotAvailable, setIsSlotAvailable] = useState(true);

  const checkAvailability = async (photographer, selectedDate, selectedTime) => {
    const startTime = new Date(`${selectedDate}T${selectedTime}`);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); 

    const q = query(
      collection(db, "photographerBookings"),
      where("photographerId", "==", photographer.id),
      where("date", "==", selectedDate)
    );

    const querySnapshot = await getDocs(q);
    for (let doc of querySnapshot.docs) {
      const booking = doc.data();
      const bookedStartTime = new Date(`${booking.date}T${booking.startTime}`);
      const bookedEndTime = new Date(bookedStartTime.getTime() + 60 * 60 * 1000);

      
      if (
        (startTime >= bookedStartTime && startTime < bookedEndTime) ||
        (endTime > bookedStartTime && endTime <= bookedEndTime)
      ) {
        setIsSlotAvailable(false);
        return;
      }
    }
    setIsSlotAvailable(true);
  };

  const bookSlot = async (photographer) => {
    if (!date || !timeSlot) {
      alert("Please select both a date and time slot.");
      return;
    }

    
    await checkAvailability(photographer, date, timeSlot);
    if (!isSlotAvailable) {
      alert("This slot is unavailable. Please select a different time.");
      return;
    }

    try {
      await addDoc(collection(db, "photographerBookings"), {
        photographerId: photographer.id,
        date,
        startTime: timeSlot,
        duration: 1, 
        status: "booked",
      });
      alert(`Slot booked with ${photographer.name} on ${date} at ${timeSlot} for $${photographer.price}`);
    } catch (error) {
      console.error("Error booking slot: ", error);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="text-3xl font-bold text-left mb-6">Available Photographers</h2>
      <div className="photographer-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photographers.map((photographer) => (
          <div
            key={photographer.id}
            className={`photographer-card border p-5 rounded-lg shadow-lg ${
              photographer.available ? 'bg-green-50' : 'bg-red-50'
            } flex flex-col items-center justify-between`}
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-1">{photographer.name}</h3>
              <p className="text-gray-600">Experience: {photographer.experience}</p>
              <p className="text-gray-600">Price: ${photographer.price}</p>
              <p className={`font-semibold ${photographer.available ? "text-green-600" : "text-red-600"}`}>
                Status: {photographer.available ? "Available" : "Not Available"}
              </p>
            </div>
            {photographer.available && (
              <div className="mt-4 w-full text-center">
                <input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  className="border rounded p-2 w-full mb-2"
                />
                <input
                  type="time"
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="border rounded p-2 w-full"
                />
                <button
                  onClick={() => bookSlot(photographer)}
                  className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 w-full"
                >
                  Book Slot
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookPhotographer;

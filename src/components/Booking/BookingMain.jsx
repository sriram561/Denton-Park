import React, { useState, useEffect } from "react";
import "./Booking.css";
import AppointmentForm from "./BookingForm"; // Ensure the path is correct
import AppointmentList from "./BookingList"; // Ensure the path is correct
import { db } from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const BookingMain = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "bookings"));
                const appointmentsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setAppointments(appointmentsData);
            } catch (error) {
                console.error("Error fetching appointments: ", error);
            }
        };

        fetchAppointments();
    }, []);

    const addAppointment = async (appointment) => {
        try {
            const docRef = await addDoc(collection(db, "bookings"), appointment);
            setAppointments([...appointments, { ...appointment, id: docRef.id }]);
        } catch (error) {
            console.error("Error adding appointment: ", error);
        }
    };

    const deleteAppointment = async (id) => {
        try {
            await deleteDoc(doc(db, "bookings", id));
            setAppointments(appointments.filter(appointment => appointment.id !== id));
        } catch (error) {
            console.error("Error deleting appointment: ", error);
        }
    };

    const editAppointment = async (id, editedName, editedDate) => {
        try {
            const appointmentDoc = doc(db, "bookings", id);
            await updateDoc(appointmentDoc, { name: editedName, date: editedDate });
            setAppointments(appointments.map(appointment =>
                appointment.id === id ? { ...appointment, name: editedName, date: editedDate } : appointment
            ));
        } catch (error) {
            console.error("Error updating appointment: ", error);
        }
    };

    const clearAppointments = () => {
        setAppointments([]);
    };

    return (
        <div style={{ margin: "5vh 0vh" }}>
            {/* <h1 style={{ textAlign: "center" }}>Book your vacation now!!</h1> */}
            <AppointmentForm addAppointment={addAppointment} />
            {/* <AppointmentList
                appointments={appointments}
                deleteAppointment={deleteAppointment}
                clearAppointments={clearAppointments}
                editAppointment={editAppointment}
            /> */}
        </div>
    );
};

export default BookingMain;

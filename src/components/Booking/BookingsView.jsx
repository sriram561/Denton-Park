import React, { useState, useEffect } from "react";
import "./Booking.css";
import AppointmentForm from "./BookingForm";
import AppointmentList from "./BookingList";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const BookingView = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Function to fetch appointments from Firestore
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
        <div>
            <AppointmentList
                appointments={appointments}
                deleteAppointment={deleteAppointment}
                clearAppointments={clearAppointments}
                editAppointment={editAppointment}
            />
        </div>
    );
};

export default BookingView;

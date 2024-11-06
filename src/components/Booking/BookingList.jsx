import React, { useState } from "react";

const AppointmentList = ({
    appointments,
    deleteAppointment,
    editAppointment,
    clearAppointments,
}) => {
    const [editedIndex, setEditedIndex] = useState(null);
    const [editedName, setEditedName] = useState("");
    const [editedDate, setEditedDate] = useState("");

    const handleEdit = (index) => {
        setEditedIndex(index);
        setEditedName(appointments[index].name);
        setEditedDate(appointments[index].date);
    };

    const handleSaveEdit = (id) => {
        editAppointment(id, editedName, editedDate);
        setEditedIndex(null);
        setEditedName("");
    };

    const handleCancelEdit = () => {
        setEditedIndex(null);
        setEditedName("");
    };

    return (
        <div className="container">
            <table id="list">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={appointment.id}>
                            <td>{index + 1}</td>
                            <td>
                                {editedIndex === index ? (
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                    />
                                ) : (
                                    appointment.name
                                )}
                            </td>
                            <td>
                                {editedIndex === index ? (
                                    <input
                                        type="date"
                                        value={editedDate}
                                        onChange={(e) => setEditedDate(e.target.value)}
                                    />
                                ) : (
                                    appointment.date
                                )}
                            </td>
                            <td>
                                {editedIndex === index ? (
                                    <>
                                        <button className="submitButton" onClick={() => handleSaveEdit(appointment.id)}>
                                            Save
                                        </button>
                                        <button className="submitButton" onClick={handleCancelEdit}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="submitButton" onClick={() => handleEdit(index)}>
                                            Edit
                                        </button>
                                        <button className="submitButton" onClick={() => deleteAppointment(appointment.id)}>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <button className="submitButton" onClick={clearAppointments}>Clear All Appointments</button> */}
        </div>
    );
};

export default AppointmentList;

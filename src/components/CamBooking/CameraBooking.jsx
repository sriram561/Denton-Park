import React, { useState } from "react";
import RentCamera from "./RentCamera";
import BookPhotographer from "./BookPhotographer";

const CameraBooking = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const renderSelectedOption = () => {
    if (selectedOption === "rent") return <RentCamera />;
    if (selectedOption === "photographer") return <BookPhotographer />;
    return null;
  };

  return (
    <div className="container flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-center">Camera Booking</h1>
      <p className="mt-4 text-lg text-gray-700 text-center">
        Choose between renting high-quality cameras or booking a professional photographer to capture your moments.
        Enjoy a seamless and memorable photography experience!
      </p>
      <div className="options-container flex space-x-8 mt-8">
        {/* Rent Camera Option */}
        <div
          onClick={() => setSelectedOption("rent")}
          className={`option-card cursor-pointer p-6 text-center rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
            selectedOption === "rent" ? "bg-green-100 border-green-500 border-2" : "bg-white"
          }`}
        >
          <i className="fas fa-camera text-4xl text-green-500 mb-4"></i>
          <h2 className="text-2xl font-semibold mb-2">Rent a Camera</h2>
          <p className="text-gray-600 mb-4">Access high-quality cameras for your special events or travel needs.</p>
          <button className="btn btn-primary">Select</button>
        </div>

        {/* Book Photographer Option */}
        <div
          onClick={() => setSelectedOption("photographer")}
          className={`option-card cursor-pointer p-6 text-center rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
            selectedOption === "photographer" ? "bg-green-100 border-green-500 border-2" : "bg-white"
          }`}
        >
          <i className="fas fa-user-camera text-4xl text-green-500 mb-4"></i>
          <h2 className="text-2xl font-semibold mb-2">Book a Photographer</h2>
          <p className="text-gray-600 mb-4">Hire a professional photographer to capture your memorable moments.</p>
          <button className="btn btn-primary">Select</button>
        </div>
      </div>
      <div className="selected-option mt-8 w-full">{renderSelectedOption()}</div>
    </div>
  );
};

export default CameraBooking;

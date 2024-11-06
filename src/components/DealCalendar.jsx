import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCandyCane, faStar, faSatellite, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./DealCalendar.css";
import { Link } from "react-router-dom";


const DealCalendar = () => {
  const months = [
    { name: "January", days: 31 },
    { name: "February", days: 28 }, 
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 },
  ];

  const deals = {
    2: { icon: faCandyCane, color: "pink", text: "Free Cotton Candy for every ticket!" },
    5: { icon: faSatellite, color: "blue", text: "Free Roller Coaster Ride!" },
    12: { icon: faCandyCane, color: "pink", text: "Cotton Candy Day!" },
    18: { icon: faStar, color: "yellow", text: "Star Attraction Discount!" },
    25: { icon: faSatellite, color: "blue", text: "Special Event: Roller Coaster Festival!" },
  };

  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [selectedDeal, setSelectedDeal] = useState("");

  const currentDay = new Date().getDate();

  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex === 0 ? 11 : prevIndex - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex === 11 ? 0 : prevIndex + 1));
  };

  const handleDayClick = (day) => {
    if (deals[day]) {
      setSelectedDeal(deals[day].text);
    } else {
      setSelectedDeal("");
    }
  };

  const currentMonth = months[currentMonthIndex];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePreviousMonth} className="nav-button">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h2>{currentMonth.name}</h2>
        <button onClick={handleNextMonth} className="nav-button">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="deal-details">
        <h3>Today's Deal:</h3>
        <p>{deals[currentDay] ? deals[currentDay].text : "No Deal Today"}</p>
      </div>
      <div className="days">
        {Array.from({ length: currentMonth.days }, (_, day) => (
          <div
            key={day + 1}
            className={`day ${deals[day + 1] ? "has-deal" : ""}`}
            style={deals[day + 1] ? { backgroundColor: deals[day + 1].color } : {}}
            onClick={() => handleDayClick(day + 1)}
          >
            {day + 1}
            {day + 1 === currentDay && <div className="today-indicator" />} {}
            {deals[day + 1] && (
              <FontAwesomeIcon icon={deals[day + 1].icon} />
            )}
          </div>
        ))}
      </div>
      {selectedDeal && (
       <Link to='/rides'>

        <div className="deal-details">
          <h3>Deal of the Day:</h3>
          <p>{selectedDeal}</p>
        </div></Link>
      )}
    </div>
  );
};

export default DealCalendar;

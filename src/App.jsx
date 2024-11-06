import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Rides from "./components/Rides/Rides";
import LoginWrapper from "./components/Auth/LoginWrapper";
import Register from "./components/Auth/Register";
import Home from "./components/Home";
import HighRides from "./components/Rides/HighRides";
import ClearSignage from "./components/ClearSignage/ClearSignage";
import SignageCard from "./components/SignageCard";
import BookingMain from "./components/Booking/BookingMain";
import BookingView from "./components/Booking/BookingsView";
import WaterRides from "./components/Rides/WaterRides";
import KidsRides from "./components/Rides/KidsRides";
import LandRides from "./components/Rides/LandRides";
import Facilities from "./components/Facilities/facilities"; 
import CameraBooking from "./components/CamBooking/CameraBooking";
import ScreenReader from "./components/Facilities/ScreenReader";
import Vehicles from './components/Facilities/Vehicles';
import WheelChair from "./components/Facilities/WheelChair";
import Dining from "./components/Restaurants/Dining";
import Chatbot from "./components/ChatBot";
import DealCalendar from './components/DealCalendar';
import AboutUs from "./components/AboutUs";
import { CartProvider } from "./components/CartContext"; 
import CartPage from './components/CartPage';
import ContactUs from './components/ContactUs';

import AdminRoute from './components/Admin/AdminRoute';
import Landing from './components/Admin/Landing'
import AdminVehicles from './components/Admin/AdminVehicles';
import AdminWheelChair from './components/Admin/AdminWheelChair';
import AdminTransactions from './components/Admin/AdminTransactions';
import AdminFeedback from './components/Admin/AdminFeedback';
import AdminBookings from './components/Admin/AdminBookings';
import AdminPhotographers from './components/Admin/AdminPhotographers';
import AdminRides from './components/Admin/AdminRides';
import AdminHighRides from './components/Admin/AdminHighRides';
import AdminLandRides from './components/Admin/AdminLandRides';
import AdminWaterRides from './components/Admin/AdminWaterRides';
import AdminKidsRides from './components/Admin/AdminKidsRides';
import AdminOldPeopleWheelChair from './components/Admin/AdminOldPeopleWheelChair';
import AdminHandicappedWheelChair from './components/Admin/AdminHandicappedPeopleWheelChair';
import AdminOliveGreen from './components/Admin/AdminOliveGreen';
import AdminTasteOfIndia from './components/Admin/AdminTasteOfIndia';
import AdminPhotin from './components/Admin/AdminPhothin';
import AdminDining from "./components/Admin/AdminDining";
import Reviews from "./components/Reviews";


const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginWrapper/>} />
          <Route path="/login/register" element={<Register />} />
          <Route path="/rides" element={<Rides />} />
          <Route path="/clearSignage" element={<ClearSignage />} />
          <Route path="/bookings" element={<BookingMain />} />
          <Route path="/highRides" element={<HighRides />} />
          <Route path="/waterRides" element={<WaterRides />} />
          <Route path="/kidsRides" element={<KidsRides />} />
          <Route path="/landRides" element={<LandRides />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/admin" element={<Landing />} />
          <Route path="/cameraBooking" element={<CameraBooking />} />
          <Route path="/screenreader" element={<ScreenReader />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/wheelchair" element={<WheelChair />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/calendar" element={<DealCalendar />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/signagecard" element={<SignageCard />} />
          <Route path="/contactus" element={<ContactUs />} />
  
          <Route path="/admin-vehicles" element={<AdminVehicles />} />
          <Route path="/admin-wheelchairs" element={<AdminWheelChair />} />
          <Route path="/transactions" element={<AdminTransactions />} />
          <Route path="/contact-us" element={<AdminFeedback />} />
          <Route path="/ticket-booking" element={<AdminBookings />} />
          <Route path="/photographers" element={<AdminPhotographers />} />
          <Route path="/admin-rides" element={<AdminRides />} />
          <Route path="/adminhighrides" element={<AdminHighRides />} />
          <Route path="/adminwaterrides" element={<AdminWaterRides />} />
          <Route path="/adminlandrides" element={<AdminLandRides />} />
          <Route path="/adminkidsrides" element={<AdminKidsRides />} />
          <Route path="/adminoldpeoplewheelchairs" element={<AdminOldPeopleWheelChair />} />
          <Route path="/adminhandicappedwheelchairs" element={<AdminHandicappedWheelChair />} />
          <Route path="/adminolivegreen" element={<AdminOliveGreen />} />
          <Route path="/admintasteofindia" element={<AdminTasteOfIndia />} />
          <Route path="/adminphothin" element={<AdminPhotin />} />
          <Route path="/admindining" element={<AdminDining />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route
            path="/landing"
            element={<AdminRoute> <Landing /> </AdminRoute> }
          />
          

        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
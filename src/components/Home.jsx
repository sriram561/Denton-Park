// Home.jsx
import React from "react";
import Hero from "./Hero/Hero";
import Services from "./Services/Services";
import Banner from "./Banner/Banner";
import Footer from "./Footer/Footer";

const Home = () => {
  return (
    <main className="overflow-x-hidden bg-white text-dark">
      <Hero />
      <Services />
      <Banner />
      <Footer />
    </main>
  );
};

export default Home;

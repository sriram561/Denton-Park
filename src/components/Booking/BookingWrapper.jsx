import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import Blob from "../../assets/blob.svg";
import aPark from "../../assets/aPark.jpg";
import BookingMain from "./BookingMain";

export const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Hero = () => {
  const [user, setUser] = useState(null); // State for user
  const [loggedInThroughLoginPage, setLoggedInThroughLoginPage] = useState(false); // State for login page status

  return (
    <section className="bg-light overflow-hidden relative">
      <Navbar />
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px]">
        {/* Hero Image on Left */}
        <div className="flex justify-center items-center order-last md:order-first">
          <motion.img
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            src={aPark}
            alt="Amusement Park"
            className="w-[400px] xl:w-[600px] relative z-10 drop-shadow"
            style={{ borderRadius: "50%", width:"35vw" }}
          />
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            src={Blob}
            alt="Decorative Blob"
            className="absolute -bottom-32 w-[800px] md:w-[1500px] z-[1] hidden md:block"
          />
        </div>

        {/* Login Form on Right */}
        <div className="flex flex-col justify-center py-14 md:py-0 relative z-20">
          <motion.div
            variants={FadeUp(0.6)}
            initial="initial"
            animate="animate"
            className="lg:max-w-[400px] mx-auto"
          >
            <BookingMain />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

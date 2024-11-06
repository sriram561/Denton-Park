import React from "react";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
import { SiReactos } from "react-icons/si";


const Footer = () => {
  return (
    <footer className="py-28 bg-[#f7f7f7]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="container"
      >
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-14 md:gap-4">
          <div className="space-y-4 max-w-[300px]" style={{placeSelf:"center"}}>
            <h1 className="text-2xl font-bold">DENTON Park</h1>
            <h1 className="text-2xl">Connect with us through</h1>
            <div className="flex space-x-6 py-3">
  <a href="https://chat.whatsapp.com/FQSKgJ5f1eIAhlyF5sVym0">
    <FaWhatsapp className="text-3xl cursor-pointer hover:text-primary hover:scale-105 duration-200" />
  </a>
  <a href="https://www.instagram.com/the.coding.journey/">
    <FaInstagram className="text-3xl cursor-pointer hover:text-primary hover:scale-105 duration-200" />
  </a>
  <a href="https://www.youtube.com/@TheCodingJourney">
    <FaYoutube className="text-3xl cursor-pointer hover:text-primary hover:scale-105 duration-200" />
  </a>
</div>
            <p className="text-dark2">
             
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;

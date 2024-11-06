import React from "react";
import { Link } from "react-router-dom";
import { CiSignpostDuo1 } from "react-icons/ci";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoMdHappy } from "react-icons/io";
import { MdLocalActivity } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { SiReactos } from "react-icons/si";
import { IoCartOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const ServicesData = [
  {
    id: 1,
    title: "Rides",
    link: "/rides",
    icon: <SiReactos />,
    delay: 0.2,
  },
  {
    id: 2,
    title: "Dining",
    link: "/dining",
    icon: <IoFastFoodOutline />,
    delay: 0.3,
  },
  {
    id: 3,
    title: "Facilities",
    link: "/facilities",
    icon: <MdLocalActivity />,
    delay: 0.4,
  },
  {
    id: 4,
    title: "Clear Signage",
    link: "/clearSignage",
    icon: <CiSignpostDuo1 />,
    delay: 0.5,
  },
  {
    id: 5,
    title: "Chat With Us",
    link: "/chat",
    icon: <IoMdHappy />,
    delay: 0.6,
  },
  {
    id: 6,
    title: "Contact Us",
    link: "/contactus",
    icon: <BiSupport />,
    delay: 0.7,
  },
  {
    id: 6,
    title: "Cart Page",
    link: "/cartpage",
    icon: <IoCartOutline />,
    delay: 0.7,
  },
];

const SlideLeft = (delay) => {
  return {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Services = () => {
  return (
    <section className="bg-white">
      <div className="container pb-14 pt-16">
        <h1 className="text-4xl font-bold text-left pb-10">
          Explore DENTON Now!
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {ServicesData.map((service) => (
            <Link to={service.link} key={service.id}>
              <motion.div
                variants={SlideLeft(service.delay)}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="bg-[#f4f4f4] rounded-2xl flex flex-col items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 hover:shadow-2xl h-full" // Set height to full
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h1 className="text-lg font-semibold text-center px-3 flex-grow"> {/* Added flex-grow */}
                  {service.title}
                </h1>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
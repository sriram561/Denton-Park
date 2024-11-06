import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore"; 

const SlideUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const DynamicView = ({ heading, collectionName, pricing=false }) => { 
  const [servicesData, setServicesData] = useState([]); 

  useEffect(() => {
    const fetchServices = async () => {
      const servicesCollection = collection(db, collectionName);
      const servicesSnapshot = await getDocs(servicesCollection);
      const servicesList = servicesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServicesData(servicesList);
    };

    fetchServices();
  }, [collectionName]); 

  return (
    <section className="bg-white">
      <div className="container pb-14 pt-16">
        <h1 className="text-4xl font-bold text-left pb-10">{heading}</h1>
        <div className="flex flex-col gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              variants={SlideUp(0.1 * index)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-[#f4f4f4] rounded-2xl flex p-4 py-7 hover:bg-white hover:scale-105 duration-300 hover:shadow-2xl"
            >
              <div className="flex items-start">
                <div className="flex flex-col flex-shrink-0 mr-4">
                  <h1 className="text-lg font-semibold">{service.title}</h1>
                  <img style={{ placeSelf: "center" }} src={service.image} alt={service.title} className="w-16 h-16 mt-2" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm mt-4 mr-4">{service.description}</p>
                </div>
              </div>
              {pricing && (
              <div className="flex-shrink-0 text-right ml-auto mt-auto">
                <p className="text-lg font-semibold">Price: {service.pricing}</p>
              </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicView;

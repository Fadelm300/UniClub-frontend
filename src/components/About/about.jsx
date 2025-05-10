import React from "react";
import { motion } from "framer-motion";
import "./about.css";

const AboutUs = () => {
  return (
    <motion.div 
      className="about-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1>About Us</h1>
      <div className="team-images">
        <div className="team-member">
          <img src="/TeamMember/ali.png" alt="Ali Hadi Talib" />
          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
          >
            Ali Hadi Talib
          </motion.p>
        </div>
        <div className="team-member">
          <img src="/TeamMember/Fadel.png" alt="Fadel Moussa" />
          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
          >
            Fadel Moussa
          </motion.p>
        </div>


        <div className="team-member">
          <img src="/TeamMember/HUSAIN BARAKAT.jpeg" alt="HUSAIN BARAKAT" />
          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
          >
            HUSAIN BARAKAT
          </motion.p>
        </div>
      </div>
      <motion.p 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        We are a team of three friends working together on an exciting project to create the best platform for university students. Our mission is to make studying easier by providing a centralized hub for academic resources and essential student tools.
      </motion.p>
      <motion.p 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        Founded in 2024, our goal is to offer a seamless, well-organized, and user-friendly experience. We believe that simplifying access to information helps students focus more on learning and achieving their goals.
      </motion.p>
      <motion.p 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        Join us on our journey to enhance student life through innovation and collaboration!
      </motion.p>
    </motion.div>
  );
};

export default AboutUs;

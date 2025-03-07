import React from "react";
import { motion } from "framer-motion";
import "./OurServices.css";

const services = [
  {
    title: "Academic Resources",
    description:
      "Access lecture notes, past exams, and study guides to help you prepare for your classes and exams.",
  },
  {
    title: "Organizational Tools",
    description:
      "Stay on top of assignments and deadlines with our integrated calendar and task management tools.",
  },
  {
    title: "University Information",
    description:
      "Find essential university details, including course schedules, faculty information, and important updates.",
  },
  {
    title: "Student Support",
    description:
      "Our support team is here to assist you with any issues or questions you may have about using the platform.",
  },
];

const OurServices = () => {
  return (
    <motion.div
      className="services-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>Our Services</h1>
      <p>
        We offer a range of services designed to support university students in
        their academic journey. Our platform provides tools and resources to
        make studying easier, more organized, and less stressful.
      </p>

      <div className="services-list">
        {services.map((service, index) => (
          <motion.div
            className="service-item"
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OurServices;

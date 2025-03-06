import React, { useState } from "react";
import "./FAQ.css";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is the purpose of this platform?",
      answer: "Our platform aims to provide university students with easy access to academic resources, organizational tools, and important information."
    },
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking the 'Sign Up' button on the homepage and filling out the registration form."
    },
    {
      question: "Is there a fee to use the platform?",
      answer: "No, our platform is completely free for all university students."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer dedicated support via email and chat for any questions or issues you may have while using the platform."
    },
    {
      question: "Can I access the platform on my mobile device?",
      answer: "Yes, our platform is mobile-friendly and can be accessed on any device with internet connectivity."
    },
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on the 'Forgot Password?' link on the login page and following the instructions."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div 
      className="faq-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <motion.div 
            className="faq-item" 
            key={index} 
            onClick={() => toggleFAQ(index)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="faq-question">
              <h3>{item.question}</h3>
              <span className="faq-toggle">{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && (
              <motion.p 
                className="faq-answer"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                {item.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQ;

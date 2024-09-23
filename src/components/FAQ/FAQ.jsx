import React from 'react';
import './FAQ.css';

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

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <div className="faq-item" key={index}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;

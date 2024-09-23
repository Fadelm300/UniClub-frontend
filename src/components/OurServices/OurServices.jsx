import React from 'react';
import './OurServices.css';

const OurServices = () => {
  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <p>
        We offer a range of services designed to support university students in their academic journey. Our platform provides tools and resources that make studying easier, more organized, and less stressful.
      </p>
      
      <div className="services-list">
        <div className="service-item">
          <h3>Academic Resources</h3>
          <p>
            Access a wide range of academic materials including lecture notes, past exams, and study guides to help you prepare for your classes and exams.
          </p>
        </div>
        <div className="service-item">
          <h3>Organizational Tools</h3>
          <p>
            Stay on top of your assignments and deadlines with our integrated calendar and task management tools, tailored for students.
          </p>
        </div>
        <div className="service-item">
          <h3>University Information</h3>
          <p>
            Get all the information you need about your university, from course schedules to faculty details, all in one place.
          </p>
        </div>
        <div className="service-item">
          <h3>Student Support</h3>
          <p>
            Our support team is here to assist you with any issues or questions you may have about using the platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurServices;

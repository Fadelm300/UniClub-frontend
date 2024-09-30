// import React from 'react';
import { Link } from 'react-router-dom';
import '../footer/footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function footer() {
  return (
    <div>
      <footer className="footer">
        <div className="containerfooter">
          <div className="row">
            <div className="footer-col">
              <h4>company</h4>
              <ul>
                <li><Link to= '/about'>About Us</Link></li>
                <li><Link to= '/OurServices'>our services</Link></li>
                <li><Link to= '/privacyPolicy'>privacy policy</Link></li>
                <li><Link to= '/AffiliateProgram'>Affiliate Program</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>get help</h4>
              <ul>
                <li><Link to='/FAQ'>FAQ</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
                <li><Link to='/contact'>GPA calculate</Link></li>
 
              </ul>
            </div>
            <div className="footer-col">
            <h4>Serves</h4>
              <ul>
                <li><Link to='/GPAStudent'>GPA calculate</Link></li>
              </ul>
            </div>


            <div className="footer-col">
              <h4>follow us</h4>
              <div className="social-links">
                <a href="https://x.com/Bh_9_?t=WAuWIBDZJHL16wc1JgzRJQ&s=09/"><i className="fa-brands fa-x-twitter"></i></a>
                <a href="https://www.instagram.com/__f.001?igsh=em5kc3Bvc2kya2Vk/"><i className="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.com/in/fadel-mohammad-b70662151/"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          <p className='Copyright' >Copyright 2024. UniClub . All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


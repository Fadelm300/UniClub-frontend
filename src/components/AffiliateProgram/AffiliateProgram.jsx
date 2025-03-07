import React from 'react';
import { motion } from 'framer-motion';
import './AffiliateProgram.css';

function AffiliateProgram() {
  return (
    <motion.div 
      className="affiliate-program"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Affiliate Program</h2>
      <p>
        Join our Affiliate Program and partner with us to help students access essential academic resources. Earn commissions by promoting our platform.
      </p>
      <h3>How It Works</h3>
      <ol>
        <li><strong>Sign Up:</strong> Register for our affiliate program.</li>
        <li><strong>Promote:</strong> Share your unique referral link with your audience.</li>
        <li><strong>Earn:</strong> Receive commissions for every signup through your link.</li>
      </ol>
      <h3>Benefits</h3>
      <ul>
        <li><strong>Competitive Commission Rates</strong></li>
        <li><strong>Dedicated Support</strong></li>
        <li><strong>Access to Marketing Materials</strong></li>
      </ul>
      <h3>Get Started</h3>
      <p>
        Apply today to become an affiliate and start earning by helping students succeed. For more information, contact our support team.
      </p>
      <motion.a 
        href="/"
        className="get-started-button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >

        Get Started
      </motion.a>
    </motion.div>
  ); 
}

export default AffiliateProgram;

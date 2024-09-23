import React from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
      <h2>Privacy Policy</h2>
      <p><strong>Effective Date:</strong> September 23, 2024</p>
      <p>
        We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when using our website.
      </p>
      <h3>Information We Collect</h3>
      <ul>
        <li>
          <strong>Personal Information:</strong> When you register, we may collect details like your name, email, and university.
        </li>
        <li>
          <strong>Usage Data:</strong> We collect information on how you interact with our site, including your IP address, browser type, and pages visited.
        </li>
      </ul>
      <h3>How We Use Your Information</h3>
      <ul>
        <li><strong>To Improve Our Services:</strong> We use data to enhance user experience and website functionality.</li>
        <li><strong>Communication:</strong> We may send updates, newsletters, or promotional materials.</li>
      </ul>
      <h3>Data Protection</h3>
      <p>
        We implement security measures to safeguard your data. However, no method is 100% secure, and we cannot guarantee absolute security.
      </p>
      <h3>Third-Party Sharing</h3>
      <p>
        We do not sell or share your personal information with third parties, except for necessary service providers or as required by law.
      </p>
      <h3>Your Rights</h3>
      <p>
        You have the right to access, modify, or delete your personal information. Contact us for any requests or concerns.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
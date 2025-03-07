import React from "react";
import { motion } from "framer-motion";
import "./PrivacyPolicy.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const PrivacyPolicy = () => {
  return (
    <motion.div
      className="privacy-policy"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <motion.h2 variants={fadeInUp}>Privacy Policy</motion.h2>
      <motion.p className="policy-date" variants={fadeInUp}>
        <strong>Effective Date:</strong> September 23, 2024
      </motion.p>
      <motion.p variants={fadeInUp}>
        We value your privacy and are committed to protecting your personal
        information. This Privacy Policy outlines how we collect, use, and
        safeguard your data when using our website.
      </motion.p>

      <motion.h3 variants={fadeInUp}>Information We Collect</motion.h3>
      <motion.ul variants={fadeInUp}>
        <li>
          <strong>Personal Information:</strong> When you register, we may
          collect details like your name, email, and university.
        </li>
        <li>
          <strong>Usage Data:</strong> We collect information on how you
          interact with our site, including your IP address, browser type, and
          pages visited.
        </li>
      </motion.ul>

      <motion.h3 variants={fadeInUp}>How We Use Your Information</motion.h3>
      <motion.ul variants={fadeInUp}>
        <li>
          <strong>To Improve Our Services:</strong> We use data to enhance user
          experience and website functionality.
        </li>
        <li>
          <strong>Communication:</strong> We may send updates, newsletters, or
          promotional materials.
        </li>
      </motion.ul>

      <motion.h3 variants={fadeInUp}>Data Protection</motion.h3>
      <motion.p variants={fadeInUp}>
        We implement security measures to safeguard your data. However, no
        method is 100% secure, and we cannot guarantee absolute security.
      </motion.p>

      <motion.h3 variants={fadeInUp}>Third-Party Sharing</motion.h3>
      <motion.p variants={fadeInUp}>
        We do not sell or share your personal information with third parties,
        except for necessary service providers or as required by law.
      </motion.p>

      <motion.h3 variants={fadeInUp}>Your Rights</motion.h3>
      <motion.p variants={fadeInUp}>
        You have the right to access, modify, or delete your personal
        information. Contact us for any requests or concerns.
      </motion.p>
    </motion.div>
  );
};

export default PrivacyPolicy;

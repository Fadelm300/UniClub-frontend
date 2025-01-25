import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../../services/authService";
import "./OtpVerification.css";
import OtpForm from "./OtpForm";
const OtpVerification = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || props.email;

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
      const response = await authService.verifyOtp({ email, otp });
      if (response.user) {
        setMessage("OTP Verified Successfully! Redirecting to Sign In...");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Failed to verify OTP. Please try again.");
    }
  };

  // Start  timer 
  

  

  

  

  return (
    <OtpForm  
      handleOtpSubmit = {handleOtpSubmit}

      error={error} 
      setError={setError}

      message={message}
      setMessage={setMessage}

      email={email}
      otp={otp}
      setOtp={setOtp}
    />
  );
};

export default OtpVerification;

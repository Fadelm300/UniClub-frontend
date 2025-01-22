import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../../services/authService";
import "./OtpVerification.css";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(180); // 3 minutes timer
  const email = location.state?.email;

  useEffect(() => {
    // Start the countdown timer when the component mounts
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
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

  // Convert timer seconds to MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="otp-verification-body">
      <div className="otp-verification-container">
        <h1>OTP Verification</h1>
        <p>
          Please enter the OTP sent to your email: <strong>{email}</strong>
        </p>
        <div className="form-otp">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button onClick={handleOtpSubmit}>Verify OTP</button>
        </div>
        <div className="timer">
          {timer > 0 ? (
            <p>Time left: {formatTime(timer)}</p>
          ) : (
            <p style={{ color: "red" }}>OTP Expired. Please request a new one.</p>
          )}
        </div>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default OtpVerification;

import React, { useState, useEffect } from "react";
import authService from '../../services/authService';

const OtpForm = ({handleOtpSubmit , error ,  setError , message , setMessage , email , otp , setOtp}) => {

    const [timer, setTimer] = useState(180);

    const handleResendOtp = async () => {
      try {
        setError("");
        setMessage("");
        const successMessage = await authService.resendOtp(email);
        setMessage(successMessage);
        setTimer(180); // 3 minutes
      } catch (err) {
        setError(err.message || "Failed to resend OTP. Please try again.");
      }
    };
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    useEffect(() => {
      if (timer > 0) {
        const countdown = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        return () => clearInterval(countdown);
      }
    }, [timer]);

    return (
    <div className="otp-verification-body">
      <div className="otp-verification-container">
        <h1>OTP Verification</h1>
        <p>
          Please enter the OTP sent to your email address.
        </p>
        <div className="form-otp">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button onClick={handleOtpSubmit} disabled={timer <= 0}>
            Verify OTP
          </button>
        </div>
        <div className="timer">
          {timer > 0 ? (
            <p>Time left: {formatTime(timer)}</p>
          ) : (
            <p style={{ color: "red" }}>OTP Expired. Please request a new one.</p>
          )}
        </div>
        { (
          <div className="resend-otp">
            <button onClick={handleResendOtp}>Resend OTP</button>
          </div>
        )}
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
    );
}

export default OtpForm;
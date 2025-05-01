import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import "./ResetPassword.css";
import Otpform from "../otp/OtpForm";
import OtpForm from "../otp/OtpForm";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.resetPasswordStep1(formData);
      console.table(formData);
      console.log(response);
      if (response.message) {
        setSuccessMessage("One-time passcode sent successfully!");
        setTimeout(() => {
            setSuccessMessage("");
            setPage(2);
        }, 2000);
      } else {
        setErrorMessage(response.error || "An error occurred.");
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const handleOtpSubmit = async (e) => {
      e.preventDefault();
      try {
        setError("");
        setMessage("");
        const response = await authService.resetPasswordStep2({ email: formData.email , username:formData.username , otp:otp });

        if (response.message) {
          setMessage("OTP Verified Successfully!...");
          setTimeout(() => {
            setMessage("");
            setPage(3);
          }, 2000);
        } else {
          setError("Invalid OTP. Please try again.");
        }
      } catch (err) {
        setError(err.message || "Failed to verify OTP. Please try again.");
      }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.resetPasswordStep3(formData);
      if (response.message) {
        setSuccessMessage("Password reset successfully!");
        setTimeout(() => {
            setSuccessMessage("");
            navigate("/signin");
        }, 2000);
      } else {
        setErrorMessage(response.error || "An error occurred.");
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

return (
    <div>
        <header className="custom-header">
            <div className={`header-item ${page === 1 ? 'current' : ''}`}>1</div>
            <div className="header-line"></div>
            <div className={`header-item ${page === 2 ? 'current' : ''}`}>2</div>
            <div className="header-line"></div>
            <div className={`header-item ${page === 3 ? 'current' : ''}`}>3</div>
        </header>
        {page === 1 && (
            <div className="reset-pass-step1-body">
                <div className="reset-pass-step1-container">
                    <h1>Reset Password</h1>
                    <p>
                        Enter your <strong>email</strong> or <strong>username</strong> to receive a one-time passcode.
                    </p>
                    <form onSubmit={handleSubmit} className="reset-pass-step1-form">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            
                        />
                        <p>or</p>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <button type="submit">Send One-Time Passcode</button>
                        {successMessage && <p className="reset-pass-step1-success-message">{successMessage}</p>}
                        {errorMessage && <p className="reset-pass-step1-error-message">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        )}
        {page === 2 &&(
            <>
            {/* <div>back</div> */}
            <OtpForm
              handleOtpSubmit = {handleOtpSubmit}

              error={error} 
              setError={setError}

              message={message}
              setMessage={setMessage}

              email={formData.email}

              otp={otp}
              setOtp={setOtp}
              
            />
            </>)
            }
        {page === 3 && (
            <div className="reset-pass-step1-body">
                <div className="reset-pass-step1-container">
                    <h1>Reset Password</h1>
                    <p>
                        Enter your new password below.
                    </p>
                    <form onSubmit={handleResetSubmit} className="reset-pass-step1-form">
                        <input
                            type="password"
                            placeholder="New Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <button type="submit">Reset Password</button>
                        {successMessage && <p className="reset-pass-step3-success-message">{successMessage}</p>}
                        {errorMessage && <p className="reset-pass-step3-error-message">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        )}
    </div>
);
};

export default ResetPassword;

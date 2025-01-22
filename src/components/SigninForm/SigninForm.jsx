


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";
import "./SigninForm.css";

const SigninForm = (props) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
 const [message, setMessage] = useState(['']);
const [error, setError] = useState("");
const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    passwordConf: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin({
        username: formData.username,
        password: formData.password,
      });
      props.setUser(user);
      navigate("/");
    } catch (err) {
      setMessage(' invalid credentials please try again.');
    }
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      if (formData.password === formData.passwordConf) {
        const newUserResponse = await authService.signup(formData);
        if (newUserResponse.error) {
          setError(newUserResponse.error);
          return;
        }
        props.setUser(newUserResponse.user);
        // navigate("/signin");
        navigate("/otp", { state: { email: formData.email } });
        // window.location.reload();
      } else {
        setError("Passwords do not match");  // Display error if passwords don't match
      }
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const toggleForm = () => {
    setIsActive(!isActive);
  };



  return (


//====================================Sign Up============================================================

    
    <div className="fullContainer">
      
      <div className={`container ${isActive ? "active" : ""}`} id="container">
      <div className="form-container sign-up">
              <form onSubmit={handleSubmitSignUp}>
                <p>{error}</p>
                <h1 className="H1Sign" >Sign Up</h1>
                 <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
             
          {submitted && formData.username.trim() === "" ? (
  <p className="error-message">Username is required</p>
) : submitted && formData.username.includes(" ") ? (
  <p className="error-message">Username cannot contain spaces.</p>
) :submitted && !/^[a-zA-Z0-9_]{3,}$/.test(formData.username) ? (
  <p className="error-message">
    Username must be at least 3 characters and can only contain letters, numbers, and underscores.
  </p>
) : null}


                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email) && formData.email !== "" && (
                  <p className="error-message">Invalid email address</p>
                )}

                <input
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {!/^\d+$/.test(formData.phone) && formData.phone !== "" && (
                  <p className="error-message">Phone number must be numeric</p>
                )}

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
               {formData.password && (
                        <>
                          {formData.password.length < 8 ? (
                            <p className="error-message">Password must be at least 8 characters long.</p>
                          ) : !/[A-Z]/.test(formData.password) ? (
                            <p className="error-message">Password must contain at least one uppercase letter.</p>
                          ) : !/[0-9]/.test(formData.password) ? (
                            <p className="error-message">Password must contain at least one number.</p>
                          ) : null}
                        </>
                      )}

                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="passwordConf"
                  value={formData.passwordConf}
                  onChange={handleChange}
                  required
                />
                {formData.password !== formData.passwordConf && formData.passwordConf !== "" && (
                  <p className="error-message">Passwords do not match</p>
                )}
                
                <button type="submit">Sign Up</button>
              </form>
            </div>


        {/* ====================================end of Sign Up============================================================ */}








        <div className="form-container sign-in">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <h1 className="H1Sign" >Sign In</h1>
            <p>{message}</p>
            <input
              type="text"
              autoComplete="off"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              autoComplete="off"
              placeholder="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Sign In</button>
          </form>
        </div>






        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1 >Welcome Back!</h1>
              <div className="image-layer">
                    <img src="img/white-outline.png" className="form-image-main" alt="form-image-main"/>
                    <img src="/img/dots.png" className="form-image dots" alt="form-image dots"/>
                    <img src="/img/coin.png" className="form-image coin" alt=""/>
                    <img src="/img/spring.png" className="form-image spring" alt=""/>
                    <img src="/img/rocket.png" className="form-image rocket" alt=""/>
                    <img src="/img/cloud.png" className="form-image cloud" alt=""/>
                    <img src="/img/stars.png" className="form-image stars" alt=""/>
                    <img src="/img/stars.png" className="form-image stars2" alt=""/>

                    
                </div>
              <button className="hidden" onClick={toggleForm}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1 >Hello, Friend!</h1>
              

               <div className="image-layer">
                    <img src="img/white-outline.png" className="form-image-main" alt="form-image-main"/>
                    <img src="/img/dots.png" className="form-image dots" alt="form-image dots"/>
                    <img src="/img/coin.png" className="form-image coin" alt=""/>
                    <img src="/img/spring.png" className="form-image spring" alt=""/>
                    <img src="/img/rocket.png" className="form-image rocket" alt=""/>
                    <img src="/img/cloud.png" className="form-image cloud" alt=""/>
                    <img src="/img/stars.png" className="form-image stars" alt=""/>
                    <img src="/img/stars.png" className="form-image stars2" alt=""/>

                    
                </div>
              <button className="hidden" onClick={toggleForm}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;

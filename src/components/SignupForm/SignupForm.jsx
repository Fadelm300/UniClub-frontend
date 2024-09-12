import authService from '../../services/authService'

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./SignupForm.css"

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
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
      updateMessage('');
      const newUserResponse = await authService.signup(formData)
      props.setUser(newUserResponse.user)
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="signMain2">
      <p className='logintxt' >Sign Up</p>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="username">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="name"
              value={username}
              name="username"
              onChange={handleChange}
              className="usernameinput"

            />
          </div>
          <div className="password">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              autoComplete='off'
              onChange={handleChange}
              className="passwordinput"

            />
          </div>
          <div className="password">
            <label htmlFor="confirm">Confirm Password:</label>
            <input
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              autoComplete='off'
              onChange={handleChange}
              className="passwordinput"
            />
          </div>
          <div className="buttons">
            <button disabled={isFormInvalid()}>Sign Up</button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default SignupForm;
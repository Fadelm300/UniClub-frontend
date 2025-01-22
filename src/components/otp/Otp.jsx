import React, { useState } from 'react';
import authService from '../../services/authService';

const OtpForm = (props) => {
    const [formData, setFormData] = useState({
        otp: "",
        email: props.location.state.email,

    });
    console.log(props.location.state.email);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await authService.verfiy(formData);
            
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="otp">OTP</label>
            <input
            type="text"
            name="otp"
            id="otp"
            value={formData.otp}
            onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}

export default OtpForm;
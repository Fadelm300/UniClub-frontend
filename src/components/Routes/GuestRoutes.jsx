import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingReal from '../LandingReal/LandingReal';
import SigninForm from '../SigninForm/SigninForm'

function GuestRoutes({setUser }) {
  return (
    <>
        <Route path="/signin" element={<SigninForm setUser={setUser} end />} />
        <Route path="/" element={<LandingReal />} />
    </>
  )
}

export default GuestRoutes
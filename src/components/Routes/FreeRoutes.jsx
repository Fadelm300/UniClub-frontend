import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';

// components
import Landing from '../Landing/Landing';
import PostDetails from '../PostDetails/PostDetails';
import Help from '../Help/help';
import About from '../About/about';
import Contact from '../Contact/contact';
import PrivacyPolicy from "../privacyPolicy/PrivacyPolicy"
import AffiliateProgram from "../AffiliateProgram/AffiliateProgram"
import OurServices from "../OurServices/OurServices"
import FAQ from "../FAQ/FAQ"
import SigninForm from '../SigninForm/SigninForm'


function FreeRoutes({user , handleDeletePost , handleDeleteFile ,handleUpdateFile , setUser}) {
  return (
    <>
            {/* view channels */}
            <Route
              path="/:uni"
              element={
                <Landing
                  user={user}
                  handleDeleteFile={handleDeleteFile}
                  handleUpdateFile={handleUpdateFile}
                />
              }
            />
            <Route
              path="/:uni/:college"
              element={
                <Landing
                  user={user}
                  handleDeleteFile={handleDeleteFile}
                  handleUpdateFile={handleUpdateFile}
                />
              }
            />
            <Route
              path="/:uni/:college/:major"
              element={
                <Landing
                  user={user}
                  handleDeleteFile={handleDeleteFile}
                  handleUpdateFile={handleUpdateFile}
                />
              }
            />
            <Route
              path="/:uni/:college/:major/:course"
              element={
                <Landing
                  user={user}
                  handleDeleteFile={handleDeleteFile}
                  handleUpdateFile={handleUpdateFile}
                />
              }
            />
            <Route
              path="/:uni/:college/:major/:course/:event"
              element={
                <Landing
                  user={user}
                  handleDeleteFile={handleDeleteFile}
                  handleUpdateFile={handleUpdateFile}
                />
              }
            />

            {/* view post */}
            <Route
              path="/:uni/post/:postid"
              element={
                <PostDetails user={user} handleDeletePost={handleDeletePost} />
              }
            />
            <Route
              path="/:uni/:college/post/:postid"
              element={
                <PostDetails user={user} handleDeletePost={handleDeletePost} />
              }
            />
            <Route
              path="/:uni/:college/:major/post/:postid"
              element={
                <PostDetails user={user} handleDeletePost={handleDeletePost} />
              }
            />
            <Route
              path="/:uni/:college/:major/:course/post/:postid"
              element={
                <PostDetails user={user} handleDeletePost={handleDeletePost} />
              }
            />
            <Route
              path="/:uni/:college/:major/:course/:event/post/:postid"
              element={
                <PostDetails user={user} handleDeletePost={handleDeletePost} />
              }
            />
        {/* other stuff */}
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/AffiliateProgram" element={<AffiliateProgram />} />
        <Route path="/OurServices" element={<OurServices />} />
        <Route path="/FAQ" element={<FAQ />} />


    </>
  )
}

export default FreeRoutes
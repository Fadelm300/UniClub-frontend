import React from "react";
import { Link } from "react-router-dom";
import "./ExpectSection.css"; 

const ExpectSection = () => {
  return (
    <div className="expect-container">
      <div className="expect">
        <h2 className="expect-title">What to Expect from UniClub</h2>
        <Link to="https://youtu.be/ww4G4PPFDec" className="video-link">Watch Intro Video &rarr;</Link>
      </div>

      <div className="expect-grid">
        <div className="expect-item">
          <div className="expect-header">
            <img src="icons8-team-48.png" alt="team" />
            <h3>Access Essential Knowledge</h3>
          </div>
          <p>From university guidelines to subject-specific materials, UniClub centralizes all the critical information you need to succeed.</p>
        </div>

        <div className="expect-item">
          <div className="expect-header">
            <img src="icons8-share-48 (1).png" alt="share" />
            <h3>Connect with Peers</h3>
          </div>
          <p>Engage with fellow students, discuss topics, and expand your academic insights.</p>
        </div>

        <div className="expect-item">
          <div className="expect-header">
            <img src="icons8-bursts-48.png" alt="bursts" />
            <h3>Stay Organized and Informed</h3>
          </div>
          <p>With our easy-to-use platform, you can keep track of important dates, upcoming events, and university updates—all in one place.</p>
        </div>

        <div className="expect-item">
          <div className="expect-header">
            <img src="icons8-laptop-48.png" alt="laptop" />
            <h3>A Front-Row Seat to Innovation</h3>
          </div>
          <p>UniClub isn’t just about accessing resources; it’s about being part of a community that empowers students to achieve their best.</p>
        </div>
      </div>
    </div>
  );
};

export default ExpectSection;

import React from 'react';

function HeroSection(props) {
    return (
      <div className="hero-section">
        <h1>Welcome to The Book Bower</h1>
        <p>Escape Reality, One Page at a Time</p>
        <button className="cta-btn" onClick={props.handleCtaClick}>Get Started</button>
        <button className="ncta-btn" onClick={props.handleNctaClick}>Learn More</button>
      </div>
    );
  }

  export default HeroSection;
  

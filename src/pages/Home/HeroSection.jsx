import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import './HeroSection.css';

function HeroSection(props) {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate('/signup');
  };

  const handleNctaClick = () => {
    navigate('/about');
  };

  return (
    <div className="hero-section">
      <Breadcrumb>
        <Container>
          <h1>Welcome to The Book Bower</h1>
          <p>Escape Reality, One Page at a Time</p>
          <p>
            <button className="cta-btn" onClick={handleCtaClick}>Get Started</button>
            <button className="ncta-btn" onClick={handleNctaClick}>Learn More</button>
          </p>
        </Container>
      </Breadcrumb>
    </div>
  );
}

export default HeroSection;

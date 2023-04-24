import React from 'react';

function AboutUs() {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>At The Book Bower, we're passionate about connecting people with the books they love. Our mission is to create a community of book lovers and to provide a platform for authors and readers to connect and share their passion for literature.</p>
      <p>Our team of experienced professionals is dedicated to providing the best possible experience for our customers. We're constantly exploring new ways to improve our platform and to make it easier for you to find the books you love.</p>
      <p>Thank you for choosing The Book Bower!</p>
      
      <h2>Meet Our Team</h2>
      <div className="team">
        <div className="team-member">
          <img src="https://example.com/jane.png" alt="Alexandrite Llaneras" />
          <h3>Alexandrite Llaneras</h3>
          <p>Web Developer</p>
        </div>
        <div className="team-member">
          <img src="../assets/Jean.jpg" alt="Jean Buniag" />
          <h3>Jean Buniag</h3>
          <p>Web Developer</p>
        </div>
        <div className="team-member">
          <img src="https://example.com/bob.png" alt="Norman Paul Co" />
          <h3>Norman Paul Co</h3>
          <p>Web Developer</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

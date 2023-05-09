import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Jean from '../../assets/Jean.jpg';
import Alexandrite from '../../assets/Alexandrite.jpg';
import Norman from '../../assets/Norman.png';
import './About.css'

function About() {
  return (
    <div className="about-us">
      <Breadcrumb>
          <Container>
            <div className="category-page-title">About Us</div>
          </Container>
      </Breadcrumb>
      <h6><b>Welcome to The Book Bower, the official school library of LlaBuCo International School - Philippines.</b></h6>
      <p className="about-us-content">Our library is a haven for students and faculty members who love to read and learn. We have a wide range of books available, from fiction to non-fiction, reference materials to classic literature. Our collection also includes audio and e-books for those who prefer to read digitally.</p>
      <p className="about-us-content">We believe that reading plays an important role in the development of our students, and it is our mission to provide a learning environment that fosters a love for reading and encourages intellectual curiosity. Our librarians are always available to help students find the right book for their interests and needs.</p>
      <p className="about-us-content">At The Book Bower, we're passionate about connecting people with the books they love. Our mission is to create a community of book lovers and to provide a platform for authors and readers in our school to connect and share their passion for literature.</p>
      <p className="about-us-content">Our team of experienced professionals is dedicated to providing the best possible experience for our readers. We're constantly exploring new ways to improve our platform and to make it easier for you to find the books you love.</p>
      <p className="about-us-content">Thank you for visiting The Book Bower. We hope that you'll find our library to be a place of inspiration and learning.</p>
      
      <div className='meet'>
      <h2 style={{ textAlign: 'center' }}>Meet Our Team</h2>
      <div className="team" style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div className="team-member">
          <img src={Alexandrite} alt="Alexandrite Llarenas" style={{borderRadius: '50%'}} />
          <h3>Alexandrite Llarenas</h3>
          <p>Web Developer</p>
        </div>
        <div className="team-member">
          <img src={Jean} alt="Jean Buniag" style={{ borderRadius: '50%' }} />
          <h3>Jean Buniag</h3>
          <p>Web Developer</p>
        </div>
        <div className="team-member">
          <img src={Norman} alt="Norman Paul Co" style={{borderRadius: '50%'}} />
          <h3>Norman Paul Co</h3>
          <p>Web Developer</p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default About;

import React, { useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./ForgotPassword.css";


function ForgotPassword() {
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      // Show a message to the user indicating that an email has been sent
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="forgot-password">
      <Breadcrumb>
            <Container>
              <div className="category-page-title">Forgot Password</div>
            </Container>
      </Breadcrumb>
      <section className="section">
        <Container>
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="img"></div>
                <div className="login-wrap p-4 p-md-5">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4">Forgot your password?</h3>
                      <p>Please enter the email address you provided during sign up to receive a password reset link via email.</p>
                    </div>
                  </div>
                  <form className="forgot-password"onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                      <label className="label">Email</label>
                      <div className="email-input-container">
                        <span className="email-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                        <input type="email" className="form-control email-input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required></input>
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <button type="submit" className="form-control btn btn-primary rounded submit px-3">Reset Password</button>
                    </div> 
                  </form>
                  <p className="text-center"><a href="/login">Back to Login</a></p>
                </div>
              </div>
            </div>
          </div> 
        </Container>
      </section>
  </div>
  );
}

export default ForgotPassword;

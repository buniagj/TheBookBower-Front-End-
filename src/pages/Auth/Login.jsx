import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      // Assuming your Laravel API returns a token and role upon successful login
      localStorage.setItem('token', data.token); 
      localStorage.setItem('role', data.role); // Store the role in local storage
      localStorage.setItem('grade_level', data.grade_level); // Store the grade level in local storage
      localStorage.setItem('section', data.section); // Store the section in local storage
      
      // Redirect the user to the appropriate dashboard based on their role
      if (data.role === 'admin') {
        navigate('/admin');
      } else if (data.role === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/student');
      }
    } catch (error) {
      console.error(error);
    }
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function toggleRememberMe() {
    setRememberMe(!rememberMe);
  }

  function handleForgotPasswordClick(event) {
    event.preventDefault();
    // Add logic for forgot password functionality here
  }

  return (
    <div className="login">
      <Breadcrumb>
            <Container>
              <div className="category-page-title">Login To Your Account</div>
            </Container>
      </Breadcrumb>
      <section className='section'>
        <Container>
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="img"></div>
                <div className="login-wrap p-4 p-md-5">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4">Log in to your account</h3>
                    </div>
                  </div>
                  <form className="sign-in"onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                      <label className="label">Email</label>
                      <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required></input>
                    </div>
                    <div className="form-group mb-4">
                      <label className="label">Password</label>
                      <div className="password-input-container">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control password-input"
                          placeholder="Password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          required
                        />
                        <span className="password-toggle-icon" onClick={toggleShowPassword}>
                          {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                        </span>

                      </div>
                    </div>
                    <div className="form-group d-md-flex">
                      <div className="w-50">
                        <label className="checkbox-wrap checkbox-primary">Remember Me
                          <input type="checkbox" checked={rememberMe} onChange={toggleRememberMe}/>
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="w-50 text-md-right">
                        <a href="./ForgotPassword" onClick={handleForgotPasswordClick}>Forgot Password</a>
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <button type="submit" className="btn btn-primary btn-lg btn-block">Log In</button>
                    </div> 
                  </form>
                  <p className="text-center">Don't have an account? <a href="/register">Sign Up</a></p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Login;

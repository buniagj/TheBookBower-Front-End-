import React, { useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import { faUser, faPhone, faLocationDot, faEnvelope, faUnlockKeyhole, faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Signup.css';
import http from "../../lib/https"
import { useNavigate } from "react-router-dom";


function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [role, setRole] = useState('student'); // Default role is "student"
  const [gradeLevel, setGradeLevel] = useState('');
  const [section, setSection] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (
      !name || !phoneNumber || !address || !email || !password || 
      !passwordConfirmation || password !== passwordConfirmation || !role
    ) {
      return
    }

    try {
      const body = {
        name,
        phone_number: phoneNumber,
        address,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role_name: role
      }
      const res = await http.post("/register", body)
      localStorage.setItem('user', JSON.stringify(res.data.data.user))
      localStorage.setItem('token', res.data.data.token)
      if (res.data.data.user.role_name === 'admin') {
        navigate('/admin');
      } else if (res.data.data.user.role_name === 'teacher') {
        navigate('/user');
      } else {
        navigate('/user');
      }
    } catch(e) {
      if (e.response.data.errors) {
        setErrors({
          name: e.response.data.errors.name ? e.response.data.errors.name : [],
          phoneNumber: e.response.data.errors.phoneNumber ? e.response.data.errors.phoneNumber : [],
          address: e.response.data.errors.address ? e.response.data.errors.address : [],
          email: e.response.data.errors.email ? e.response.data.errors.email : [],
          password: e.response.data.errors.password
            ? e.response.data.errors.password
            : [],
            passwordConfirmation: e.response.data.errors.password_confirmation
            ? e.response.data.errors.password_confirmation
            : [],
          role: e.response.data.role ? e.response.data.role : []
        })
      } else {
        alert(e.response.data.message)
      }
    }
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="signup">
      <Breadcrumb>
            <Container>
              <div className="category-page-title">Sign Up to Create an Account</div>
            </Container>
      </Breadcrumb>
      <section className="section">
        <Container>
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="img"></div>
                <div className="signup-wrap p-4 p-md-5">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4">Sign Up</h3>
                      <p className="caption">Please fill in this form to create an account!</p>
                    </div>
                  </div>
                  <form className="sign-in" onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                      <label className="label">Full Name</label>
                      <div className="name-input-container">
                        <span className="name-icon"><FontAwesomeIcon icon={faUser} /></span>
                        <input type="text" className="form-control name-input" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required></input>
                      </div>
                    </div>
                    <div className="form-group mb-2">
                      <label className="label">Phone Number</label>
                      <div className="name-input-container">
                        <span className="name-icon"><FontAwesomeIcon icon={faPhone} /></span>
                        <input type="text" className="form-control phone-number-input" placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required></input>
                      </div>
                    </div>
                    <div className="form-group mb-2">
                      <label className="label">Address</label>
                      <div className="address-input-container">
                        <span className="address-icon"><FontAwesomeIcon icon={faLocationDot} /></span>
                        <input type="text" className="form-control address-input" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required></input>
                      </div>
                    </div>
                    <div className="form-group mb-2">
                      <label className="label">Email Address</label>
                      <div className="email-input-container">
                        <span className="email-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                        <input type="email" className="form-control email-input" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required></input>
                      </div>
                    </div>
                    <div className="form-group mb-2">
                      <label className="label">Password</label>
                      <div className="password-input-container">
                        <span className="lock-icon"><FontAwesomeIcon icon={faUnlockKeyhole} /></span>
                        <input type="password" className="form-control password-input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required></input>
                        <span className="password-toggle-icon" onClick={toggleShowPassword}>
                          {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                        </span>
                      </div>
                    </div>
                    <div className="form-group mb-2">
                      <label className="label">Confirm Password</label>
                      <div className="confirm-password-input-container">
                        <span className="lock-icon"><FontAwesomeIcon icon={faKey} /></span>
                        <input type="password" className="form-control confirm-password-input" placeholder="Confirm Password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required></input>
                        <span className="password-toggle-icon" onClick={toggleShowPassword}>
                          {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                        </span>
                      </div>
                    </div>
                    <div className="form-group mb-2">
                      <label className="label">Role</label>
                      <div className="select-container">
                        <select className="form-control" value={role} onChange={e => setRole(e.target.value)}>
                          <option value="student">Student</option>
                          <option value="teacher">Teacher</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </div>
                    {/* {role === 'student' && (
                      <>
                      <div className="form-group mb-2">
                        <label className="label"> Grade Level</label>
                        <div className="confirm-password-input-container">
                          <input type="text" className="form-control" placeholder="Grade Level" value={gradeLevel} onChange={e => setGradeLevel(e.target.value)} required />
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <div className="confirm-password-input-container">
                        <label className="label">Section</label>
                          <input type="text" className="form-control" placeholder='Section' value={section} onChange={e => setSection(e.target.value)} required />
                        </div>
                      </div>
                      </>
                    )} */}
                    <div className="d-flex mb-4 mt-3 align-items-center">
                      <label className="checkbox-wrap checkbox-primary">
                        <input type="checkbox"required />
                        <span className="checkmark"></span>
                        I accept the
                        &nbsp;
                        <a href="/terms">Terms of Use</a>
                        &nbsp;
                        &
                        &nbsp;
                        <a href="/privacy">Privacy Policy</a>
                      </label>
                      </div>
                      <div className="form-group mb-3">
                        <button type="submit" className="form-control btn btn-primary rounded submit px-3">Sign Up</button>
                      </div> 
                  </form>
                  <p className="text-center">Already have an account? <a href="/login">Login here</a></p>
                </div>
              </div>
            </div>
          </div> 
        </Container>
      </section>
    </div>
  );
}

export default Signup;

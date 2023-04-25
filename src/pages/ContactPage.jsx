import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ContactPage = () => {
  const [reason, setReason] = useState('');

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
  };

  return (
    <Container className="my-5">
      <Row>
        <Col lg={8}>
          <h2>Contact Us</h2>
          <p>
            Fill out the form below and we will get back to you as soon as possible.
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formReason">
              <Form.Label>Reason for contacting</Form.Label>
              <Form.Control as="select" value={reason} onChange={handleReasonChange}>
                <option value="">Please select a reason</option>
                <option value="Lost Book">Lost Book</option>
                <option value="Damaged Book">Damaged Book</option>
                <option value="Delayed Return">Delayed Return</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;

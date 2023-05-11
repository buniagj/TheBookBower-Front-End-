import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import './PrivacyPolicy.css'

const PrivacyPolicy = () => {
return (
    <div className="privacy-policy">
      <Breadcrumb>
          <Container>
            <div className="category-page-title">Privacy Policy</div>
          </Container>
      </Breadcrumb>
      <h6><b>Privacy Policy</b></h6>
      <Container>
        <p className="privacy-policy-content">At The Book Bower, we are committed to protecting your privacy. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of personal information that we receive from users of our website.</p>
      </Container>
      <Container>
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Collection of Information</Accordion.Header>
            <Accordion.Body>
              We collect personal information that you voluntarily provide to us when you register for an account or use our website. This information may include your name, email address, postal address, and payment information. We also collect information automatically when you use our website, such as your IP address, browser type, and device information.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Use of Information</Accordion.Header>
            <Accordion.Body>
              We use your personal information to provide and improve our services, to communicate with you about your account, to process your orders, and to personalize your experience on our website. We may also use your information for marketing purposes, such as sending you promotional emails or newsletters.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Disclosure of Information</Accordion.Header>
            <Accordion.Body>
              We may share your personal information with third-party service providers who perform services on our behalf, such as payment processing, shipping, and customer support. We may also share your information with our business partners, such as publishers or authors, to offer you special promotions or discounts. We may disclose your information if required by law or if we believe that such disclosure is necessary to protect our rights or to comply with a legal process.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Security of Information</Accordion.Header>
            <Accordion.Body>
              We take reasonable measures to protect your personal information from unauthorized access or disclosure. However, no security measures can guarantee absolute security. Therefore, we cannot guarantee that your personal information will be completely secure.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Cookies</Accordion.Header>
            <Accordion.Body>
              We use cookies to enhance your experience on our website. Cookies are small text files that are stored on your device when you visit our website. We use cookies to remember your preferences, to analyze how you use our website, and to personalize your experience. You can disable cookies in your browser settings, but some features of our website may not work properly if you do.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>Changes to this Policy</Accordion.Header>
            <Accordion.Body>
              We reserve the right to modify this Privacy Policy at any time. If we make material changes to this policy, we will notify you by email or by posting a notice on our website. Your continued use of our website after any changes to this policy constitutes your acceptance of the changes.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header>Contact Us</Accordion.Header>
            <Accordion.Body>
              If you have any questions or concerns about our Privacy Policy, please contact us at privacy@thebookbower.com
            </Accordion.Body>
          </Accordion.Item>
       </Accordion>
     </Container>
    </div>
  )
};

export default PrivacyPolicy;
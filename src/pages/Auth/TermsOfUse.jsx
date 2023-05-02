import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const TermsOfUse = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="mt-5 mb-4">Terms of Use</h1>
          <p className="lead">
            Welcome to The Book Bower! By using our website, you agree to comply with and be bound by the following terms and conditions of use. Please read these terms carefully before using our website.
          </p>
          <h2 className="mt-4">1. Acceptance of Terms</h2>
          <p>
            By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
          </p>
          <h2 className="mt-4">2. Use of Our Website</h2>
          <ListGroup as="ul">
            <ListGroup.Item as="li">
              In any way that violates any applicable federal, state, local, or international law or regulation;
            </ListGroup.Item>
            <ListGroup.Item as="li">
              To engage in any fraudulent activity;
            </ListGroup.Item>
            <ListGroup.Item as="li">
              To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter", "spam," or any other similar solicitation;
            </ListGroup.Item>
            <ListGroup.Item as="li">
              To impersonate or attempt to impersonate The Book Bower, a The Book Bower employee, another user, or any other person or entity;
            </ListGroup.Item>
            <ListGroup.Item as="li">
              To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of our website, or which, as determined by us may harm The Book Bower or users of our website or expose them to liability;
            </ListGroup.Item>
          </ListGroup>
          <h2 className="mt-4">3. User Content</h2>
          <p> Any content that you post or upload to our website will be considered non-confidential and non-proprietary. By posting or uploading any content to our website, you grant us the right to use, copy, distribute, and disclose to third parties any such content for  any purpose. We have the right to remove any content or posting you make on our website at any time.</p>
          <h2 className="mt-4">4. Intellectual Property</h2>
          <p>The Book Bower and its original content, features, and functionality are owned by The Book Bower and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
          <h2 className="mt-4">5. Limitation of Liability</h2>
          <p>
            In no event shall The Book Bower, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the website; (ii) any conduct or content of any third party on the website; (iii) any content obtained from the website; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>
          <h2 className="mt-4">6. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless The Book Bower, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms of Use or your use of the website, including, but not limited to, your User Content, any use of the website's content, services, and products other than as expressly authorized in these Terms of Use or your use of any information obtained from the website.</p>
          <h2 className="mt-4">7. Termination</h2>
          <p> We may terminate or suspend your access to all or any part of the website, with or without notice, for any reason or no reason, including without limitation, breach of these Terms of Use. Upon termination of your access, you will immediately destroy any downloaded or printed materials. Any provisions of these Terms of Use that by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability. </p>
          <h2 className="mt-4">8. Governing Law and Jurisdiction</h2>
          <p> These Terms of Use and any dispute or claim arising out of, or related to, them, their subject matter, or their formation (in each case, including non-contractual disputes or claims) shall be governed by and construed in accordance with the laws of the State of California, without giving effect to any choice or conflict of law provision or rule. Any legal suit, action, or proceeding arising out of, or related to, these Terms of Use or the website shall be instituted exclusively in the federal courts of the United States or the courts of the State of California, although we retain the right to bring any suit, action, or proceeding against you for breach of these Terms of Use in your country of residence or any other relevant country. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.</p>
        </Col>
      </Row>
    </Container>
    );
  };

export default TermsOfUse;

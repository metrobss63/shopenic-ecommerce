// src/pages/PrivacyPolicy/PrivacyPolicy.jsx
import React from 'react';
import './privacy.css';

const PrivacyPolicy = () => {
  return (
    <main className="privacy-policy">
      <section className="hero">
        <h1>Privacy Policy</h1>
        <p>Your privacy matters. Here's how we protect your information.</p>
      </section>

      <div className="container">
        <section className="policy-section">
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy outlines how we collect, use, disclose, and protect your personal data when you use our website and services.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Information We Collect</h2>
          <ul>
            <li>Personal details (name, email, phone number)</li>
            <li>Transaction data and order history</li>
            <li>Browsing behavior and interaction with our site</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To process orders and deliver services</li>
            <li>To send updates, promotions, or service-related notifications</li>
            <li>To improve our platform and customer experience</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>4. Sharing Your Information</h2>
          <p>
            We do not sell your personal data. We may share it with trusted partners only to provide essential services such as payment processing, delivery, and analytics.
          </p>
        </section>

        <section className="policy-section">
          <h2>5. Data Security</h2>
          <p>
            We use modern encryption and secure server infrastructure to protect your personal information from unauthorized access.
          </p>
        </section>

        <section className="policy-section">
          <h2>6. Cookies</h2>
          <p>
            Our site uses cookies to personalize your experience, track performance, and deliver relevant content.
          </p>
        </section>

        <section className="policy-section">
          <h2>7. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal data. You may contact us at any time to manage your information.
          </p>
        </section>

        <section className="policy-section">
          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy occasionally. Any changes will be posted here with the revised effective date.
          </p>
        </section>

        <section className="policy-section">
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@example.com">support@example.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPolicy;

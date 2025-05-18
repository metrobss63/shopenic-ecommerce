// src/pages/About/AboutPage.jsx
import React from 'react';
import './About.css';

const AboutPage = () => {
  return (
    <main className="about-page bg-whitesmoke">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>Welcome to Our World</h1>
          <p>
            We are more than just a store — we’re a community that believes in quality, transparency, and creating an effortless shopping experience for everyone.
          </p>
        </section>

        {/* Mission Section */}
        <section className="about-section card">
          <h2>Our Mission</h2>
          <p>
            To empower shoppers by offering top-quality products at unbeatable prices, all while delivering exceptional customer service and building long-lasting relationships with our customers.
          </p>
        </section>

        {/* Values Section */}
        <section className="about-section card">
          <h2>Our Core Values</h2>
          <ul className="about-values">
            <li><strong>Integrity:</strong> We stand by our word and products.</li>
            <li><strong>Innovation:</strong> Always evolving to serve you better.</li>
            <li><strong>Customer First:</strong> Your satisfaction is our priority.</li>
            <li><strong>Reliability:</strong> Count on us for fast delivery and support.</li>
            <li><strong>Simplicity:</strong> Easy shopping, easy returns, easy life.</li>
          </ul>
        </section>

        {/* Story Section */}
        <section className="about-section card">
          <h2>Our Story</h2>
          <p>
            Founded in 2021, our ecommerce platform began with a simple idea: bring convenience and affordability together in one seamless experience. From humble beginnings in a small office to serving thousands of customers daily, we’ve remained committed to growth, improvement, and innovation. Every product on our shelves is handpicked with love and care.
          </p>
        </section>

       
      </div>
    </main>
  );
};

export default AboutPage;

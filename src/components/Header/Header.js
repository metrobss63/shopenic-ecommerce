import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Header = () => {
  return (
    <header className="header text-white">
      <div className="container">
        <div className="header-cnt">
          {/* Top bar */}
          <div className="header-cnt-top flex align-center justify-between fs-13 py-2 wrap">
            {/* Left */}
            <div className="header-cnt-top-l">
              <ul className="top-links flex align-center wrap">
                <li><Link to="/seller">Seller Center</Link></li>
                <li className="vert-line"></li>
                <li><Link to="/download">Download</Link></li>
                <li className="vert-line"></li>
                <li className="flex align-center social-wrap">
                  <span className="fs-13">Follow us on</span>
                  <ul className="social-links flex align-center">
                    <li className="mx-2">
                      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fs-15"></i>
                      </a>
                    </li>
                    <li className="mx-2">
                      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fs-15"></i>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* Right */}
            <div className="header-cnt-top-r">
              <ul className="top-links flex align-center wrap">
                <li>
                  <Link to="/" className="top-link-itm flex align-center">
                    <i className="fa-solid fa-circle-question mx-2"></i>
                    <span className="top-link-itm-txt">Support</span>
                  </Link>
                </li>
                <li className="vert-line"></li>
                <li><Link to="/">Register</Link></li>
                <li className="vert-line"></li>
                <li><Link to="/">Log in</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom: Navbar */}
          <div className="header-cnt-bottom">
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

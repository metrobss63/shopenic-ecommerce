import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

import { useSelector, useDispatch } from 'react-redux';
import { getUser, logout } from '../../store/userSlice'; // assume you have a logout action
import Loader from '../Loader/Loader'; 

const Header = () => {
  const isUserLoggedIn = useSelector(getUser);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout()); // Clear user data from Redux
    navigate('/login');     // Redirect to login
  };

  return (
    <header className="header text-white">
      <div className="container">
        <div className="header-cnt">
          {/* Top bar */}
          <div className="header-cnt-top flex align-center justify-between fs-13 py-2 wrap">
            {/* Right */}
            <div className="header-cnt-top-r">
              <ul className="top-links flex align-center wrap">
               

                <li>
                  <Link to="/" className="top-link-itm flex align-center">
                    
                    <span className="top-link-itm-txt">Products</span>
                  </Link>
                </li>
                <li className="vert-line"></li>

                <li>
                  <Link to="/about" className="top-link-itm flex align-center">
                    
                    <span className="top-link-itm-txt">About</span>
                  </Link>
                </li>
                <li className="vert-line"></li>


           

                {isUserLoggedIn ? (
                  <>
                    <li><Link to="/orders">Orders</Link></li>
                    <li className="vert-line"></li>
                    <li><button onClick={logoutHandler} style={{fontSize:'14px',color:'#fff'}}>Logout</button></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/signup">Register</Link></li>
                    <li className="vert-line"></li>
                    <li><Link to="/login">Log in</Link></li>
                  </>
                )}
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

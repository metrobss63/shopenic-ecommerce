import React, { useEffect, useState } from 'react';
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSidebarStatus, setSidebarOff } from '../../store/sidebarSlice';
import { fetchAsyncCategories, getAllCategories } from '../../store/categorySlice';
import Loader from '../Loader/Loader'; 

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);
  const categories = useSelector(getAllCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(fetchAsyncCategories());
      setLoading(false);
    };
    fetchCategories();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="sidebar-loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <aside className={`sidebar ${isSidebarOn ? 'hide-sidebar' : ""}`}>
      <button type="button" className='sidebar-hide-btn' onClick={() => dispatch(setSidebarOff())}>
        <i className='fas fa-times'></i>
      </button>
      <div className='sidebar-cnt'>
        <div className='cat-title fs-17 text-uppercase fw-6 ls-1h'>All Categories</div>
        <ul className='cat-list'>
          {categories.slice(0, 8).map((category, idx) => (
            <li className='nav-item no-wrap' key={idx}>
              <Link to={`category/${category.slug}`} className='nav-link text-capitalize'>
                {category.name.replace("-", " ")}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

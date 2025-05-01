import React, { useEffect, useState } from 'react';
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSidebarStatus, setSidebarOff } from '../../store/sidebarSlice';
import { fetchAsyncCategories, getAllCategories } from '../../store/categorySlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);
  const categories = useSelector(getAllCategories);
  const [loading, setLoading] = useState(true); // Start with loading as true

  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(fetchAsyncCategories()); // Wait for categories to be fetched
      setLoading(false); // Once fetched, set loading to false
    };
    
    fetchCategories();
  }, [dispatch]); // Dependency on dispatch to trigger fetching

  // If still loading, show loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <aside className={`sidebar ${isSidebarOn ? 'hide-sidebar' : ""}`}>
      <button type="button" className='sidebar-hide-btn' onClick={() => dispatch(setSidebarOff())}>
        <i className='fas fa-times'></i>
      </button>
      <div className='sidebar-cnt'>
        <div className='cat-title fs-17 text-uppercase fw-6 ls-1h'>All Categories</div>
        <ul className='cat-list'>
        {
    // Taking only the first 8 categories
    categories.slice(0, 8).map((category, idx) => (
      <li className='nav-item no-wrap' key={idx}>
        <Link to={`category/${category.slug}`} className='nav-link text-capitalize'>
          {category.name.replace("-", " ")} {/* Accessing category.name instead of category */}
        </Link>
      </li>
    ))
  }
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;


import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarOn } from '../../store/sidebarSlice';
import { getAllCategories, fetchAsyncCategories } from '../../store/categorySlice';
import { getAllCarts, getCartItemsCount, getCartTotal } from '../../store/cartSlice';
import CartModal from '../CartModal/CartModal';
import Loader from '../Loader/Loader';

const Navbar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const carts = useSelector(getAllCarts);
  const itemsCount = useSelector(getCartItemsCount);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (categories.length === 0) {
        setLoading(true);
        await dispatch(fetchAsyncCategories());
        setLoading(false);
      }
      dispatch(getCartTotal());
    };

    fetchData();
  }, [dispatch, categories.length]);

  return (
    <>
      {loading && (
        <div className='navbar-loader-overlay'>
          <Loader />
        </div>
        
      )}

      <nav className='navbar'>
        <div className='navbar-cnt'>
          <div className='brand-and-toggler'>
            <button
              type='button'
              className='sidebar-show-btn'
              onClick={() => dispatch(setSidebarOn())}
            >
              <i className='fas fa-bars'></i>
            </button>
           
          </div>

          <div className='navbar-search'>
            <input
              type='text'
              placeholder='Search items...'
              value={searchTerm}
              onChange={handleSearchTerm}
            />
            <Link to={`search/${searchTerm}`} className='search-btn'>
              <i className='fa-solid fa-magnifying-glass'></i>
            </Link>
          </div>


          <div className='navbar-cart'>
            <Link to='/cart' className='cart-btn'>
              <i className='fa-solid fa-cart-shopping'></i>
              <span className='cart-items-value'>{itemsCount}</span>
              <CartModal carts={carts} />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

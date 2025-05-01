import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { formatPrice } from '../../utils/helpers';
import './Product.css';

const Product = ({ product }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <Link to={`/product/${product?.id}`} key={product?.id} className="product-link">
      <div className="product-item" data-aos="fade-up">
        <div className="category">{product?.category}</div>
        <div className="product-item-img">
          <img className="img-cover" src={product?.images[0]} alt={product.title} />
        </div>
        <div className="product-item-info">
          <div className="brand">
            <span>Brand: </span>
            <span className="fw-7">{product?.brand}</span>
          </div>
          <div className="title">{product?.title}</div>
          <div className="price">
            <span className="old-price">{formatPrice(product?.price)}</span>
            <span className="new-price">{formatPrice(product?.discountedPrice)}</span>
            <span className="discount">({product?.discountedPercentage}% Off)</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;

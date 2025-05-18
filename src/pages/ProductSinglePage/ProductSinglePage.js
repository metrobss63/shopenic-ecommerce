import React, { useEffect, useState } from 'react';
import "./ProductSinglePage.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncProductSingle, getProductSingle, getSingleProductStatus } from '../../store/productSlice';
import { STATUS } from '../../utils/status';
import Loader from "../../components/Loader/Loader";
import { formatPrice } from "../../utils/helpers";
import { addToCart, getCartMessageStatus, setCartMessageOff, setCartMessageOn } from '../../store/cartSlice';
import CartMessage from "../../components/CartMessage/CartMessage";

const ProductSinglePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const productSingleStatus = useSelector(getSingleProductStatus);
  const [quantity, setQuantity] = useState(1);
  const cartMessageStatus = useSelector(getCartMessageStatus);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    dispatch(fetchAsyncProductSingle(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (cartMessageStatus) {
      setTimeout(() => {
        dispatch(setCartMessageOff());
      }, 2000);
    }
  }, [cartMessageStatus]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  if (productSingleStatus === STATUS.LOADING) return <Loader />;

  const discountedPrice = product?.price - (product?.price * (product?.discountPercentage / 100));

  const increaseQty = () => {
    setQuantity(prev => Math.min(prev + 1, product?.stock || 1));
  };

  const decreaseQty = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const addToCartHandler = () => {
    const totalPrice = quantity * discountedPrice;
    dispatch(addToCart({ ...product, quantity, totalPrice, discountedPrice }));
    dispatch(setCartMessageOn(true));
  };




  return (
    <main className='py-5 bg-whitesmoke'>
      <div className='product-single'>
        <div className='container'>
          <div className='product-single-content bg-white grid'>
            <div className='product-single-l'>
              <div className='product-img'>
                <div className='product-img-zoom'>
                  <img src={activeImage} alt={product?.title} className='img-cover' />
                </div>

                <div className='product-img-thumbs flex align-center my-2'>
                  {product?.images?.slice(0, 5).map((img, idx) => (
                    <div
                      key={idx}
                      className={`thumb-item ${activeImage === img ? 'active-thumb' : ''}`}
                      onClick={() => setActiveImage(img)}
                    >
                      <img src={img} alt={`thumb-${idx}`} className='img-cover' />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='product-single-r'>
              <div className='product-details font-manrope'>
                <div className='title fs-20 fw-5'>{product?.title}</div>
                <p className='para fw-3 fs-15'>{product?.description}</p>

                <div className='info flex align-center flex-wrap fs-14'>
                  <div className='rating'>
                    <span className='text-orange fw-5'>Rating:</span>
                    <span className='mx-1'>{product?.rating}</span>
                  </div>
                  <div className='vert-line'></div>
                  <div className='brand'>
                    <span className='text-orange fw-5'>Brand:</span>
                    <span className='mx-1'>{product?.brand}</span>
                  </div>
                  <div className='vert-line'></div>
                  <div className='brand'>
                    <span className='text-orange fw-5'>Category:</span>
                    <span className='mx-1 text-capitalize'>
                      {product?.category?.replace("-", " ")}
                    </span>
                  </div>
                </div>

                <div className='price'>
                  <div className='flex align-center'>
                    <div className='old-price text-gray'>{formatPrice(product?.price)}</div>
                    <span className='fs-14 mx-2 text-dark'>Inclusive of all taxes</span>
                  </div>

                  <div className='flex align-center my-1'>
                    <div className='new-price fw-5 font-poppins fs-24 text-orange'>
                      {formatPrice(discountedPrice)}
                    </div>
                    {/*<div className='discount bg-orange fs-13 text-white fw-6 font-poppins'>
                      {product?.discountPercentage}% OFF
                  </div>*/}
                  </div>
                </div>

                <div className='qty flex align-center my-4'>
                  <div className='qty-text'>Quantity:</div>
                  <div className='qty-change flex align-center mx-3'>
                    <button onClick={decreaseQty} className='qty-decrease flex align-center justify-center'>
                      <i className='fas fa-minus'></i>
                    </button>
                    <div className='qty-value flex align-center justify-center'>{quantity}</div>
                    <button onClick={increaseQty} className='qty-increase flex align-center justify-center'>
                      <i className='fas fa-plus'></i>
                    </button>
                  </div>
                  {product?.stock === 0 && (
                    <div className='qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5'>
                      out of stock
                    </div>
                  )}
                </div>

                <div className='btns'>
                  <button onClick={addToCartHandler} className='add-to-cart-btn btn'>
                    <i className='fas fa-shopping-cart'></i>
                    <span className='btn-text mx-2'>add to cart</span>
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {cartMessageStatus && <CartMessage />}
    </main>
  );
};

export default ProductSinglePage;


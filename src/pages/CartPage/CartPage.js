import React, { useEffect } from 'react';
import "./CartPage.css";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { shopping_cart } from '../../utils/images';
import { formatPrice } from '../../utils/helpers';
import { STATUS } from '../../utils/status'
//import Loader from '../../components/Loader/Loader';
import AuthModal from '../../components/CartMessage/AuthMessage';
import Loader from "../../components/Loader/Loader";



import {
  getAllCarts,
  removeFromCart,
  toggleCartQty,
  clearCart,
  getCartTotal,
  createOrderAsync,
  setOrderStatusOff,
  getOrderStatus,
  getOrderStatusMessage
} from '../../store/cartSlice';
import { getUser } from '../../store/userSlice';



const CartPage = () => {
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);
  const { itemsCount, totalAmount } = useSelector((state) => state.cart);
  const user = useSelector(getUser);
  const orderStatusMessage = useSelector(getOrderStatusMessage);
  const orderStatus = useSelector(getOrderStatus)

  const navigate = useNavigate()
  const isLoading = orderStatus === STATUS.LOADING
  const isError = orderStatus === STATUS.FAILED
  const success = orderStatus === STATUS.SUCCEEDED

  const createOrderHandler = async () => {
    if (!user) {
      navigate('/login')
    }
    let orderData = {
      userId: user._id,
      items: carts
    }
    await dispatch(createOrderAsync(orderData));
  }

  // ✅ Automatically recalculate cart totals on any cart change
  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts, dispatch]);


  useEffect(() => {
    if (orderStatus) {
      setTimeout(() => {
        dispatch(setOrderStatusOff());
      }, 6000);
    }
  }, [orderStatus]);


  if (carts.length === 0) {
    return (
      <div className='container my-5'>
        <div className='empty-cart flex justify-center align-center flex-column font-manrope'>
          <img src={shopping_cart} alt="" />
          <span className='fw-6 fs-15 text-gray'>Your shopping cart is empty.</span>
          <Link to="/" className='shopping-btn bg-orange text-white fw-5'>Go shopping Now</Link>
        </div>
      </div>
    );
  }


  return (
    <>
      {isError && <AuthModal message={orderStatusMessage} />}
      {success && <AuthModal message={orderStatusMessage} />}
      {isLoading && <Loader />}

      <div className='cart'>
        <div className='container'>
          <div className='cart-ctable'>
            <div className='c-table-head'>
              <div>S.N.</div>
              <div>Product</div>
              <div>Unit Price</div>
              <div>Quantity</div>
              <div>Total</div>
              <div>Actions</div>
            </div>

            <div className='cart-items'>
              {carts.map((cart, index) => (
                <div className='cart-item' key={cart?._id}>
                  <div data-label="S.N.">{index + 1}</div>
                  <div data-label="Product">{cart?.title}</div>
                  <div data-label="Unit Price">{formatPrice(cart?.discountedPrice)}</div>

                  <div data-label="Quantity">
                    <div className='quantity-control'>
                      <button onClick={() => dispatch(toggleCartQty({ _id: cart._id, type: "DEC" }))}>-</button>
                      <span>{cart?.quantity}</span>
                      <button onClick={() => dispatch(toggleCartQty({ _id: cart._id, type: "INC" }))}>+</button>
                    </div>
                  </div>

                  <div data-label="Total">
                    <span className='text-orange'>{formatPrice(cart?.totalPrice)}</span>
                  </div>

                  <div data-label="Actions">
                    <button onClick={() => dispatch(removeFromCart(cart._id))}>Delete</button>
                  </div>
                </div>
              ))}
            </div>

            <div className='cart-footer'>
              <button className='clear-cart' onClick={() => dispatch(clearCart())}>
                <i className='fas fa-trash'></i> Clear Cart
              </button>

              <div className='checkout-summary'>
                <p>Total ({itemsCount}) items: <span>{formatPrice(totalAmount)}</span></p>
                <button onClick={createOrderHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );

};



export default CartPage;

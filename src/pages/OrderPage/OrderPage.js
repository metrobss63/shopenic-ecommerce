import React, { useEffect } from 'react';
import './OrderPage.css';
import { formatPrice } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../../components/CartMessage/AuthMessage';
import { useSelector, useDispatch } from 'react-redux';
import { STATUS } from '../../utils/status';
import Loader from '../../components/Loader/Loader';

import {
  fetchOrderAsync,
  getOrderStatus,
  getOrderStatusMessage,
  getOrders,
  setOrderStatusOff,
} from '../../store/cartSlice';
import { getUser } from '../../store/userSlice';

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const orders = useSelector(getOrders);
  const orderStatusMessage = useSelector(getOrderStatusMessage);
  const orderStatus = useSelector(getOrderStatus);

  const isLoading = orderStatus === STATUS.LOADING;
  const isError = orderStatus === STATUS.FAILED;

  useEffect(() => {
    setTimeout(() => {
      dispatch(setOrderStatusOff());
    }, 3000);
  }, [orderStatus]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [dispatch, orderStatus]);

  useEffect(() => {
    if (orderStatus === STATUS.IDLE) {
      dispatch(fetchOrderAsync(user));
    }
  }, []);


  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const navigateHandler = (url) => {
    navigate(url);
  };

  if (orders.length === 0) {
    return (
      <div className="order-container">
        <div className="order-wrapper text-center">
         
          <p className="fs-18 fw-6 text-gray mb-3">You haven't placed any orders yet.</p>
          <button className="shopping-btn">Shop Now</button>
        </div>
      </div>
    );
  }

  return (
    <>
      {isError && <AuthModal message={orderStatusMessage} />}
      {isLoading && <Loader />}

      <div className="order-container">
        <div className="order-wrapper">
          <div className="order-header">
            <h2>Your Orders</h2>
          </div>

          <div className="cart-ctable">
            {/* Table Header for desktop */}
            <div className="cart-chead hide-on-mobile">
              <div className="cart-ctr">
                <div className="cart-cth">Order ID</div>
                <div className="cart-cth">Date</div>
                <div className="cart-cth">Status</div>
                <div className="cart-cth">Items</div>
                <div className="cart-cth">Total</div>
                <div className="cart-cth">Actions</div>
              </div>
            </div>

            {/* Table/Card Body */}
            <div className="cart-cbody">
              {orders.map((order) => {
                const total = order.items.reduce(
                  (acc, item) => acc + item.totalPrice * item.quantity,
                  0
                );
                const itemSummary = order.items
                  .map((i) => `${i.title} (x${i.quantity})`)
                  .join(', ');
                const trimmedId = order.id.slice(-6); // last 6 chars

                return (
                  <div className="cart-ctr order-card" key={order.id}>
                    <div className="cart-ctd" data-label="Order ID">#{trimmedId}</div>
                    <div className="cart-ctd" data-label="Date">{formatDate(order.date)}</div>
                    <div className="cart-ctd" data-label="Status">
                      <span className={order.status === 'Delivered' ? 'text-success' : 'text-warning'}>
                        {order.status}
                      </span>
                    </div>
                    <div className="cart-ctd" data-label="Items">{itemSummary}</div>
                    <div className="cart-ctd" data-label="Total">{formatPrice(total)}</div>
                    <div className="cart-ctd" data-label="Actions">
                      <button className="view-btn" onClick={() => navigateHandler(`/orders/${order.id}`)}>View</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;


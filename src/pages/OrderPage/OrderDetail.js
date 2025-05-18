import React, { useEffect, useState } from 'react';
import './OrderDetails.css';
import { formatPrice } from '../../utils/helpers';
import { useParams } from 'react-router-dom';
import PayModal from '../../components/CartMessage/PayModal';
import { useSelector } from 'react-redux';
import { getOrders } from '../../store/cartSlice';
import Loader from "../../components/Loader/Loader";

const OrderDetails = () => {
  const { id } = useParams();
  const orders = useSelector(getOrders);
  const [order, setOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (orders && id) {
      const foundOrder = orders.find((o) => o.id === id);
      setOrder(foundOrder);
    }
  }, [orders, id]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copy message after 2s
  };

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  if (!order) return <Loader />;

  const totalAmount = order.items.reduce(
    (acc, item) => acc + item.totalPrice * item.quantity,
    0
  );

  const payHandler = () => setOpenModal(true);
  const closeHandler = () => setOpenModal(false);

  return (
    <>
      {openModal && <PayModal amount={totalAmount} onCloseModal={closeHandler} />}

      <div className="order-details container my-5">
        <div className="order-header">
          <h2>Order #{order.id.slice(0, 6)}...</h2>
          <p>Date: {formatDate(order.date)}</p>
          <p className={`order-status ${order.status === 'Delivered' ? 'delivered' : 'processing'}`}>
            Status: {order.status}
          </p>

          <div className="tracking-section">
            <p className="tracking-text">
              <strong>Tracking Number:</strong>
              <span
                className="tracking-number"
                onClick={() => copyToClipboard(order.trackingNumber)}
                title="Click to copy"
                style={{
                  cursor: 'pointer',
                  color: '#007bff',
                  marginLeft: '8px',
                  userSelect: 'all',
                  fontWeight: '500'
                }}
              >
                {order.trackingNumber}
              </span>
              {copied && <span className="copied-message">Copied!</span>}
            </p>
            <a
              href={order.trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-link"
            >
              Track Order
            </a>
          </div>

          <button
            onClick={!order.paid ? payHandler : null}
            className={`payment-btn ${order.paid ? 'paid' : 'unpaid'}`}
          >
            {order.paid ? 'Paid' : 'Pay Now'}
          </button>
        </div>

        <div className="order-items">
          {order.items.map((item) => (
            <div className="order-item" key={item.id}>
              <div className="item-image">
                <img src={item.images[0]} alt={item.title} />
              </div>
              <div className="item-details">
                <h4>{item.title}</h4>
                <p>Unit Price: {formatPrice(item.totalPrice)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: {formatPrice(item.totalPrice * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="order-total">
          <h3>Total: {formatPrice(totalAmount)}</h3>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;



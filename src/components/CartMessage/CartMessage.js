import React from 'react';
import "./CartMessage.css";
import { correct } from "../../utils/images";

const CartMessage = ({message}) => {
  return (
    <div className='cart-message text-center'>
      <div className='cart-message-icon'>
        <img src = {correct} alt = "" />
      </div>
      <h6 className='text-white fs-14 fw-5'>{message? message:'An item has been added to your shopping cart'}</h6>
    </div>
  )
}

export default CartMessage
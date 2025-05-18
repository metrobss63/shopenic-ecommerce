import React from "react";
import styles from "./AuthModal.module.css";

const AuthModal = ({ amount, onCloseModal }) => {
  const walletAddress = "xxxxxxxxxxxxxxxxxxxxxx";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    alert("Wallet address copied to clipboard!");
    onCloseModal(); // optional — call this if you want to close modal after copying
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalView}>
        <p className={styles.modalState}>
          To complete order, make a deposit worth ${amount} to the BTC wallet address below. Click the button to copy the address:
        </p>

        <p className={styles.walletAddress}>{walletAddress}</p>

        <button className={styles.acceptBtn} onClick={copyToClipboard}>Copy Address</button>
      </div>
    </div>
  );
};

export default AuthModal;

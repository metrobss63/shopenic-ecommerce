import React from "react";
import styles from "./AuthModal.module.css";

const AuthModal = ({ message }) => {

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalView}>
        <p className={styles.modalState}>{message}</p>
        <div className={styles.modalButtonContainer}>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
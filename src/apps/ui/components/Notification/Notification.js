import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './style.module.scss';

export const notification = toast;

export function NotificationsContainer() {
  return (
    <ToastContainer
      hideProgressBar
      pauseOnHover={false}
      draggable={false}
      autoClose={5000}
      closeOnClick={false}
      className={styles.notification}
    />
  );
}

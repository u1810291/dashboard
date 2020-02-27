import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.module.css';

export const notification = toast;

export function NotificationsContainer() {
  return (
    <ToastContainer
      closeButton={false}
      hideProgressBar
      pauseOnHover={false}
      draggable={false}
      autoClose={5000}
    />
  );
}

import React from 'react';
import { PreventClosingTabWrapper } from 'apps/routing/components/PreventClosingTabWrapper/PreventClosingTabWrapper';
import { toast, ToastContainer, ToastContent, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './style.module.scss';

let blocked = false;

const blockableErrorNotification: typeof toast.error = (...args) => {
  if (blocked) {
    return 'blocked';
  }
  return toast.error(...args);
};

export const notification = {
  block: () => { blocked = true; },
  unblock: () => { blocked = false; },
  ...toast,
  error: blockableErrorNotification,
  spinner: (content: ToastContent, options?: ToastOptions) => toast(
    <PreventClosingTabWrapper>{content}</PreventClosingTabWrapper>,
    {
      ...options,
      autoClose: false,
      className: 'Toastify__toast--spinner',
    },
  ),
};

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

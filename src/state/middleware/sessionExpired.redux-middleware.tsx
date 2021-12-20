import React from 'react';
import { SessionExpiredModal } from 'apps/auth/components/SessionExpiredModal/SessionExpiredModal';
import { overlayCreate } from 'apps/overlay/state/overlay.actions';
import { notification } from 'apps/ui';
import { ErrorStatuses } from 'models/Error.model';
import { Middleware } from 'redux';
import { Routes } from 'models/Router.model';

export const sessionExpired: Middleware = (store) => (next) => (action) => {
  if (action.error) {
    const isAuthRoute = window.location.pathname.startsWith(Routes.auth.root);
    if (!isAuthRoute && action.error.response?.status === ErrorStatuses.WrongCredentials) {
      const releaseNotifications = () => {
        notification.unblock();
      };

      overlayCreate({
        children: <SessionExpiredModal />,
        options: {
          onClose: releaseNotifications,
        },
      })(store.dispatch);

      notification.block();
    }
  }
  const result = next(action);
  return result;
};

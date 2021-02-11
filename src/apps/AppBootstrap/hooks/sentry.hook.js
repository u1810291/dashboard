import { useEffect } from 'react';

export function useSentry() {
  useEffect(() => {
    const sentryLoad = async () => {
      if (!process.env.REACT_APP_SENTRY_DSN) {
        return;
      }

      const Sentry = await import('@sentry/browser');
      Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
      });
    };

    sentryLoad();
  });
}

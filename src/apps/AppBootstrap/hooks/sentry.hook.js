import { useEffect } from 'react';
import { matchPath } from 'react-router-dom';
import { AppPaths } from 'apps/routing/AppPaths';
import SentryFullStory from '../sentry/sentry-fullstory-integration';
import { history } from '../../routing/history/history';

export function useSentry() {
  useEffect(() => {
    const sentryLoad = async () => {
      if (!process.env.REACT_APP_SENTRY_DSN) {
        return;
      }

      const Sentry = await import('@sentry/react');
      const { Integrations } = await import('@sentry/tracing');

      Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
        release: process.env.REACT_APP_VERSION,
        integrations: [
          new SentryFullStory(process.env.REACT_APP_SENTRY_ORG),
          new Integrations.BrowserTracing({
            routingInstrumentation: Sentry.reactRouterV5Instrumentation(history, AppPaths, matchPath),
            tracingOrigins: [
              process.env.REACT_APP_API_URL,
              process.env.REACT_APP_SIGNUP_URL,
              process.env.REACT_APP_MATI_BUTTON_URL,
            ],
          }),
        ],
        tracesSampleRate: parseFloat(process.env.REACT_APP_SENTRY_TRACE_SAMPLE_RATE),
      });
    };

    sentryLoad();
  });
}

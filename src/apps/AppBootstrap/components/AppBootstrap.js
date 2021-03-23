import { useSentry } from '../hooks/sentry.hook';

export function AppBootstrap() {
  useSentry();

  return null;
}

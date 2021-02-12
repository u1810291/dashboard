import { useFullStory } from '../hooks/fullstory.hook';
import { useSentry } from '../hooks/sentry.hook';

export function AppBootstrap() {
  useSentry();
  useFullStory();

  return null;
}

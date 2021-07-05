import { throttle } from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';

export function useAFKListener(delayInSeconds) {
  const [lastActivity, setLastActivity] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const recordActivity = useCallback(() => throttle(() => {
    setLastActivity(moment());
    setIsActive(true);
  }, Math.floor(delayInSeconds * 0.8 * 1000)), [delayInSeconds]);

  useEffect(() => {
    window.addEventListener('scroll', recordActivity, { passive: true });
    window.addEventListener('mousemove', recordActivity, { passive: true });
    window.addEventListener('touchstart', recordActivity, { passive: true });
    return () => {
      window.removeEventListener('scroll', recordActivity);
      window.removeEventListener('mousemove', recordActivity);
      window.removeEventListener('touchstart', recordActivity);
    };
  }, [recordActivity]);

  useEffect(() => {
    const newTimer = setTimeout(() => {
      setIsActive(false);
    }, delayInSeconds * 1000);
    return () => { clearTimeout(newTimer); };
  }, [lastActivity, delayInSeconds]);

  return isActive;
}

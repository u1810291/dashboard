import { useCallback, useEffect, useState } from 'react';
import throttle from 'lodash/throttle';
import { THROTTLE_COEFFICIENT } from '../models/AfkListener.model';

export function useAfkListener(delayInSeconds: number): boolean {
  const [lastActivity, setLastActivity] = useState<number>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  const handleActivity = useCallback(() => {
    setLastActivity(Date.now());
    setIsActive(true);
  }, []);

  useEffect(() => {
    const throttledHandler = throttle(handleActivity, Math.floor(delayInSeconds * THROTTLE_COEFFICIENT * 1000));
    window.addEventListener('scroll', throttledHandler, { passive: true });
    window.addEventListener('mousemove', throttledHandler, { passive: true });
    window.addEventListener('touchstart', throttledHandler, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledHandler);
      window.removeEventListener('mousemove', throttledHandler);
      window.removeEventListener('touchstart', throttledHandler);
    };
  }, [handleActivity, delayInSeconds]);

  useEffect(() => {
    const newTimer = setTimeout(() => {
      setIsActive(false);
    }, delayInSeconds * 1000);
    return () => { clearTimeout(newTimer); };
  }, [lastActivity, delayInSeconds]);

  return isActive;
}

import { useFullStory } from 'apps/AppBootstrap';
import { signOut } from 'apps/auth/state/auth.actions';
import { useOverlay } from 'apps/overlay';
import { TimeoutModal } from 'apps/ui';
import { Routes } from 'models/Router.model';
import React, { useCallback, useEffect, useState } from 'react';
import throttle from 'lodash/throttle';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AFK_BEFORE_LOGOUT_MINUTES, getLastActivityLocalStorage, LAST_ACTIVITY_KEY, LOGOUT_ALERT_MINUTES, setLastActivityLocalStorage, THROTTLE_COEFFICIENT } from '../models/AfkListener.model';

export function useAfkListenerLogout() {
  const [lastActivity, setLastActivity] = useState<number>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const intl = useIntl();
  const disableFullstory = useFullStory();

  const handleActivity = useCallback(() => {
    setLastActivityLocalStorage(Date.now());
    setLastActivity(Date.now());
    setIsActive(true);
  }, []);

  useEffect(() => {
    const throttledHandler = throttle(handleActivity, Math.floor(AFK_BEFORE_LOGOUT_MINUTES * 60 * THROTTLE_COEFFICIENT * 1000));
    if (isActive) {
      window.addEventListener('scroll', throttledHandler, { passive: true });
      window.addEventListener('mousemove', throttledHandler, { passive: true });
      window.addEventListener('touchstart', throttledHandler, { passive: true });
    }
    return () => {
      window.removeEventListener('scroll', throttledHandler);
      window.removeEventListener('mousemove', throttledHandler);
      window.removeEventListener('touchstart', throttledHandler);
    };
  }, [handleActivity, isActive]);

  const handleLocalStorageChange = useCallback((event) => {
    if (event.key === LAST_ACTIVITY_KEY) {
      const lastActivityLocalStorage = getLastActivityLocalStorage();
      if (lastActivityLocalStorage > lastActivity && lastActivityLocalStorage < Date.now()) {
        setLastActivity(Date.now());
        setIsActive(true);
      }
    }
  }, [lastActivity]);

  useEffect(() => {
    window.addEventListener('storage', handleLocalStorageChange);
    return () => {
      window.removeEventListener('storage', handleLocalStorageChange);
    };
  }, [handleLocalStorageChange]);

  useEffect(() => {
    const newTimer = setTimeout(() => {
      setIsActive(false);
    }, AFK_BEFORE_LOGOUT_MINUTES * 60 * 1000);
    return () => { clearTimeout(newTimer); };
  }, [lastActivity]);

  const [createOverlay, closeOverlay] = useOverlay();

  const handleLogout = useCallback(async () => {
    disableFullstory();
    await dispatch(signOut());
    history.push(Routes.root);
  }, [dispatch, history, disableFullstory]);

  const handleContinue = useCallback(() => {
    handleActivity();
    closeOverlay();
  }, [handleActivity, closeOverlay]);

  useEffect(() => {
    if (!isActive) {
      createOverlay(<TimeoutModal
        title={intl.formatMessage({ id: 'dashboard.logout.afk' }, { duration: AFK_BEFORE_LOGOUT_MINUTES })}
        onTimerEnd={handleLogout}
        timeoutSeconds={LOGOUT_ALERT_MINUTES * 60}
        onClose={handleContinue}
      />, { onClose: handleContinue });
    }
    return () => closeOverlay();
  }, [createOverlay, handleLogout, isActive, intl, handleContinue, closeOverlay]);
}

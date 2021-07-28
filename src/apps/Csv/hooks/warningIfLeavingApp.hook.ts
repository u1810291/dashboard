import { useEffect } from 'react';

export function useWarningIfLeavingApp(shouldWarn: boolean) {
  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload#browser_compatibility
    function alertUser(e: BeforeUnloadEvent) {
      if (!shouldWarn) {
        return false;
      }

      // eslint-disable-next-line no-param-reassign
      e.returnValue = ''; // needed for Chrome
      return '';
    }

    window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, [shouldWarn]);
}

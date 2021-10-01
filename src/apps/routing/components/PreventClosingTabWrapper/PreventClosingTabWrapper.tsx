import { useEffect } from 'react';

export function PreventClosingTabWrapper({ children, prevent = true }) {
  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload#browser_compatibility
    function alertUser(e: BeforeUnloadEvent) {
      if (!prevent) {
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
  }, [prevent]);

  return children;
}

import React, { useRef } from 'react';
import { createOverlay, closeOverlay } from 'components';
import { hubspotMeeting } from './constants';

const MEETINGS_CONTAINER_NAME = 'meetings-iframe-container';

const loadScript = (hubSpotScript) => {
  const script = document.createElement('script');
  script.src = hubspotMeeting.embedScriptUrl;
  script.async = true;
  document.body.appendChild(script);
  script.onload = () => {
    if (hubSpotScript) {
      hubSpotScript.current = script;
    }
  };
};

const showHubSpotForm = (hubSpotScript) => {
  createOverlay(
    <div
      className={MEETINGS_CONTAINER_NAME}
      data-src={hubspotMeeting.userUrl}
    />,
    {
      onClose: () => {
        if (hubSpotScript.current) {
          document.body.removeChild(hubSpotScript.current);
        }
        closeOverlay();
      },
    },
  );
  loadScript(hubSpotScript);
};

export const useHubSpotForm = () => {
  const hubSpotScript = useRef(null);
  return () => showHubSpotForm(hubSpotScript);
};

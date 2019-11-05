import { closeOverlay, createOverlay } from 'components';
import React from 'react';
import { hubspotMeeting, MEETINGS_CONTAINER_NAME } from './constants';

const hubSpotScriptRef = React.createRef();

const loadScript = (ref) => {
  if (ref.current) {
    return;
  }
  const script = document.createElement('script');
  script.src = hubspotMeeting.embedScriptUrl;
  script.async = true;
  document.body.appendChild(script);
  ref.current = script;
};

const showHubSpotForm = (ref) => {
  createOverlay(
    <div
      className={MEETINGS_CONTAINER_NAME}
      data-src={hubspotMeeting.userUrl}
    />,
    {
      onClose: () => {
        if (ref.current) {
          document.body.removeChild(ref.current);
          ref.current = null;
        }
        closeOverlay();
      },
    },
  );
  loadScript(ref);
};

export function useHubSpotForm() {
  return () => showHubSpotForm(hubSpotScriptRef);
}

import { Box } from '@material-ui/core';
import { useContactUsLink } from 'lib/contactUs';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import React from 'react';
import { FiMessageCircle as MeetingIcon } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { AlertButton, AlertDemoButton, AlertPaper } from './AllerBanner.styles';

export function AlertBanner({ isBlocked }) {
  const intl = useIntl();
  const externalLinkHandler = useContactUsLink(intl.locale);

  const alertButtonClickHandler = () => {
    trackEvent(MixPanelEvents.BannerUpgrade);
  };

  return (
    <AlertPaper square>
      <Box fontWeight={600} fontSize={16} m={1}>
        {intl.formatMessage({ id: 'AlertBanner.text' })}
      </Box>

      <AlertDemoButton
        variant="contained"
        onClick={externalLinkHandler}
        startIcon={<MeetingIcon />}
      >
        {intl.formatMessage({ id: 'AlertBanner.requestButton' })}
      </AlertDemoButton>

      {isBlocked && (
      <Link to="/settings/pricing">
        <AlertButton variant="outlined" onClick={alertButtonClickHandler}>
          {intl.formatMessage({ id: 'AlertBanner.buttonText' })}
        </AlertButton>
      </Link>
      )}
    </AlertPaper>
  );
}

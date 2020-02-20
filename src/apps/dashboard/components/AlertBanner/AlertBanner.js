import { Box } from '@material-ui/core';
import { useHubSpotForm } from 'lib/hubspot';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import { MixPanelEvents } from 'lib/mixpanel/MixPanel.model';
import React from 'react';
import { FiMessageCircle as MeetingIcon } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { AlertButton, AlertDemoButton, AlertPaper } from './AllerBanner.styles';

export function AlertBanner() {
  const intl = useIntl();
  const showHubSpotForm = useHubSpotForm();

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
        onClick={showHubSpotForm}
        startIcon={<MeetingIcon />}
      >
        {intl.formatMessage({ id: 'AlertBanner.requestButton' })}
      </AlertDemoButton>

      <Link to="/settings/pricing">
        <AlertButton variant="outlined" onClick={alertButtonClickHandler}>
          {intl.formatMessage({ id: 'AlertBanner.buttonText' })}
        </AlertButton>
      </Link>
    </AlertPaper>
  );
}

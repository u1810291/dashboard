import React from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { trackEvent } from 'lib/mixpanel';
import { Box } from '@material-ui/core';

import { FiMessageCircle as MeetingIcon } from 'react-icons/fi';
import { useHubSpotForm } from 'lib/hubspot';
import {
  AlertPaper,
  AlertButton,
  AlertDemoButton,
} from './styles';

const AlertBanner = () => {
  const intl = useIntl();
  const showHubSpotForm = useHubSpotForm();

  const alertButtonClickHandler = () => {
    trackEvent('merchant_clicked_top_banner_upgrade');
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
};

export default AlertBanner;

import React from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import {
  Box,
  Button,
  Paper,
} from '@material-ui/core';
import { trackEvent } from 'lib/mixpanel';

import { withStyles } from '@material-ui/styles';

const AlertPaper = withStyles(() => ({
  root: {
    height: 50,
    color: 'white',
    background: '#ff6b00',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 500,
  },
}))(Paper);

const AlertButton = withStyles(() => ({
  root: {
    color: '#ff6b00',
    backgroundColor: '#fff',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    marginRight: 10,
    border: 'none',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
}))(Button);

const AlertBanner = () => {
  const intl = useIntl();
  const alertButtonClickHandler = () => {
    trackEvent('merchant_clicked_top_banner_upgrade');
  };

  return (
    <AlertPaper square>
      <Box fontWeight={600} fontSize={16} m={1}>
        { intl.formatMessage({ id: 'AlertBanner.text' }) }
      </Box>
      <Link to="/settings/pricing">
        <AlertButton variant="outlined" onClick={alertButtonClickHandler}>
          {intl.formatMessage({ id: 'AlertBanner.buttonText' })}
        </AlertButton>
      </Link>
    </AlertPaper>
  );
};

export default AlertBanner;

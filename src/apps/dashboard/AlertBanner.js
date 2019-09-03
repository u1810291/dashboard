import React from 'react';
import { Link } from 'react-router-dom'
import { useIntl } from 'react-intl';
import {
  Box,
  Button,
  Paper,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const AlertPaper = withStyles(theme => ({
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

const AlertButton = withStyles(theme => ({
  root: {
    color: '#ff6b00',
    backgroundColor: '#fff',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    marginRight: 10,
    border: 'none',
    '&:hover': {
      backgroundColor: '#fff'
    }
  }
}))(Button);

const AlertBanner = () => {
  const intl = useIntl();

  return (
    <AlertPaper square={true}>
      <Box fontWeight={600} fontSize={16} m={1}>
        { intl.formatMessage({id:'AlertBanner.text'}) }
      </Box>
      <Link to="/settings/pricing">
        <AlertButton variant="outlined">
          {intl.formatMessage({id:'AlertBanner.buttonText'})}
        </AlertButton>
      </Link>
    </AlertPaper>
  );
};

export default AlertBanner;
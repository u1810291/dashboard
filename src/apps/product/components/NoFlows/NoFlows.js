import { Box, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as EmptyFlowsIcon } from 'assets/empty-flows.svg';
import { FiPlusCircle } from 'react-icons/fi';
import { useStyles } from './NoFlows.styles';

export function NoFlows({ onAddNewFlow }) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box mb="8vh">
      <Box py={1.5}><EmptyFlowsIcon /></Box>
      <Box mb={1}>
        <Typography variant="h4">{intl.formatMessage({ id: 'VerificationFlow.emptyPage.title' })}</Typography>
      </Box>
      <Box mb={2} mx="auto" maxWidth={470} color="common.black75">
        <Typography variant="body1" align="center">
          {intl.formatMessage({ id: 'VerificationFlow.emptyPage.text' })}
        </Typography>
      </Box>
      <Button
        variant="contained"
        disableElevation
        onClick={onAddNewFlow}
        className={classes.button}
      >
        <FiPlusCircle />
        {intl.formatMessage({ id: 'VerificationFlow.page.button' })}
      </Button>
    </Box>
  );
}

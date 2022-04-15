import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useFormatMessage } from 'apps/intl';
import { ReactComponent as EmptyFlowsIcon } from 'assets/empty-flows.svg';
import { FiPlusCircle } from 'react-icons/fi';
import { useStyles } from './NoTemplates.styles';

export function NoTemplates({ onAddNewFlow }: { onAddNewFlow: () => void }) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();

  return (
    <Box mb="8vh">
      <Box py={1.5}><EmptyFlowsIcon /></Box>
      <Box mb={1}>
        <Typography variant="h4">{formatMessage('VerificationFlow.page.title')}</Typography>
      </Box>
      <Box mb={2} mx="auto" maxWidth={470} color="common.black75">
        <Typography variant="body1" align="center">
          {formatMessage('VerificationFlow.emptyPage.text')}
        </Typography>
      </Box>
      <Button
        variant="contained"
        disableElevation
        onClick={onAddNewFlow}
        className={classes.button}
      >
        <FiPlusCircle />
        {formatMessage('VerificationFlow.page.button')}
      </Button>
    </Box>
  );
}

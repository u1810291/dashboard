import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useFormatMessage } from 'apps/intl';
import { ReactComponent as GuideModal } from '../../assets/guide_modal.svg';
import { useStyles } from './StartModal.styles';

export const StartModal = ({ action }) => {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  return (
    <Container className={classes.container}>
      <GuideModal className={classes.svg} />
      <Box className={classes.buttonsGroup}>
        <Button
          className={classes.button}
          tabIndex={0}
          color="primary"
          variant="contained"
          onClick={action}
        >
          {formatMessage('StartModal.viewButton')}
        </Button>
        <Typography variant="body1">
          {formatMessage('StartModal.or')}
        </Typography>
        <Button
          tabIndex={0}
          color="primary"
          className={classes.button}
          variant="outlined"
        >
          {formatMessage('StartModal.blankFlowButton')}
        </Button>
      </Box>
    </Container>
  );
};

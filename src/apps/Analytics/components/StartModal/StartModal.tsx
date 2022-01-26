import React from 'react';
import { Container, Button, Box, Typography } from '@material-ui/core';
import { ReactComponent as GuideModal } from '../../assets/guide_modal.svg';
import { useStyles } from './StartModal.styles';

export const StartModal = ({ intl, action }) => {
  const classes = useStyles();
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
          {intl.formatMessage({ id: 'StartModal.viewButton' })}
        </Button>
        <Typography variant="body1">Or</Typography>
        <Button
          tabIndex={0}
          color="primary"
          className={classes.button}
          variant="outlined"
        >
          {intl.formatMessage({ id: 'StartModal.blankFlowButton' })}
        </Button>
      </Box>
    </Container>
  );
};

import React from 'react';
import { Container, Button, Box, Typography } from '@material-ui/core';
import { ReactComponent as GuideModal } from '../../assets/guide_modal.svg';
import styles from './StartModal.module.scss';

export const StartModal = ({ intl }) => (
  <Container className={styles.container}>
    <GuideModal />
    <Box className={styles.buttonsGroup}>
      <Button
        tabIndex={0}
        color="primary"
        variant="contained"
      >
        {intl.formatMessage({ id: 'StartModal.viewButton' })}
      </Button>
      <Typography variant="body1">Or</Typography>
      <Button
        tabIndex={0}
        color="primary"
        variant="outlined"
      >
        {intl.formatMessage({ id: 'StartModal.blankFlowButton' })}
      </Button>
    </Box>
  </Container>
);

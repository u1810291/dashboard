import React from 'react';
import { Container, Button, Box, Typography } from '@material-ui/core';
import { ReactComponent as GuideModal } from '../../assets/guide_modal.svg';
import styles from './StartModal.module.scss';

export const StartModal = ({ buttons }) => (
  <Container className={styles.container}>
    <GuideModal />
    <Box className={styles.buttonsGroup}>
      <Button
        tabIndex={0}
        color="primary"
        variant="contained"
        onClick={buttons[0].action}
      >
        {buttons[0].title}
      </Button>
      <Typography variant="body1">Or</Typography>
      <Button
        tabIndex={0}
        color="primary"
        variant="outlined"
        onClick={buttons[1].action}
      >
        {buttons[1].title}
      </Button>
    </Box>
  </Container>
);

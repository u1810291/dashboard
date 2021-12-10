import React, { useCallback } from 'react';
import { notification } from 'apps/ui';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Routes } from 'models/Router.model';
import { Box, Typography, Button } from '@material-ui/core';
import { Modal, overlayCloseAll } from 'apps/overlay';
import { useDispatch } from 'react-redux';
import { useStyles } from './SessionExpiredModal.styles';

export function SessionExpiredModal() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const styles = useStyles();

  const goToSigninPage = useCallback(() => {
    dispatch(overlayCloseAll());
    history.push(Routes.auth.signIn);
    notification.unblock();
  }, [dispatch, history]);

  return (
    <Modal onClose={goToSigninPage} className={styles.modal}>
      <Box mb={2} color="common.black90">
        <Typography variant="h3">
          {intl.formatMessage({ id: 'auth.session.expired' })}
        </Typography>
      </Box>
      <Box mb={4} color="common.black90">
        <Typography>
          {intl.formatMessage({ id: 'auth.session.expired.description' })}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={goToSigninPage}
      >
        {intl.formatMessage({ id: 'routes.go-to.login' }, { page: intl.formatMessage({ id: 'SignIn.title' }) })}
      </Button>
    </Modal>
  );
}

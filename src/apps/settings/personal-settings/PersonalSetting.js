import { Button, Typography, Grid } from '@material-ui/core';
import { Card, closeOverlay, createOverlay } from 'components';
import React, { useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { passwordChange } from 'state/auth/auth.actions';
import { selectAuthUser } from 'state/auth/auth.selectors';
import ChangePasswordModal from './modal/ChangePasswordModal';
import CSS from './PersonalSettings.module.scss';

export function PersonalSetting() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  const handleSubmit = useCallback((values, { setSubmitting, setStatus }) => {
    const { password, oldPassword } = values;

    setStatus({});
    dispatch(passwordChange({ password, oldPassword })).then(() => {
      setSubmitting(false);
      setStatus(true);
      closeOverlay();
    }).catch((error) => {
      setSubmitting(false);
      setStatus({ oldPassword: error.response.data.message });
    });

    return false;
  }, [dispatch]);

  const openChangePasswordModal = useCallback(() => {
    createOverlay(
      <ChangePasswordModal onSubmit={handleSubmit} />);
  }, [handleSubmit]);

  return (
    <Card flow="row" padding={2} className={CSS.personalSettings}>
      <div className={CSS.title}>
        <h3>
          <FormattedMessage id="apps.settings.personalSettings.title" />
        </h3>
      </div>

      <Grid container spacing={2} direction="row">
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            {intl.formatMessage({ id: 'apps.settings.personalSettings.email' })}
          </Typography>
          <Typography paragraph>
            {user.email}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            {intl.formatMessage({ id: 'apps.settings.personalSettings.password' })}
          </Typography>
          <Typography paragraph>
            {intl.formatMessage({ id: 'apps.settings.personalSettings.defaultPassword' })}
          </Typography>
          <Button
            variant="outlined"
            onClick={openChangePasswordModal}
            tabIndex={0}
          >
            {intl.formatMessage({ id: 'apps.settings.personalSettings.change' })}
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

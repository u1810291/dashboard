import { Box, FormControl, Switch, Grid, Typography, Button } from '@material-ui/core';
import { BoxBordered, notification, TextFieldName, Warning } from 'apps/ui';
import { PageLoader } from 'apps/layout';
import { VerificationPatternTypes } from 'models/Step.model';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { validateMaxLength } from 'lib/validations';
import { KeyboardKeyCodes } from 'models/Keyboard.model';
import { appPalette } from 'apps/theme';
import { selectSenderName, selectPhoneValidationMode } from '../../state/PhoneValidation.selectors';
import { SENDER_NAME_LENGTH_LIMIT, PhoneOwnershipValidationMethods } from '../../models/PhoneValidation.model';
import { useStyles } from './PhoneValidationConfiguration.styles';

export function PhoneValidationConfiguration() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [senderName, setSenderName] = useState(useSelector(selectSenderName));
  const [currentMethod, setModeCurrentMethod] = useState(useSelector(selectPhoneValidationMode));
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = useCallback(({ target: { value } }) => {
    setError(validateMaxLength(value, SENDER_NAME_LENGTH_LIMIT));
    setSenderName(value);
  }, []);

  const handleSubmitSenderName = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(merchantUpdateFlow({
        phoneOwnership: {
          companyName: senderName,
        },
      }));
    } catch (e) {
      console.error('error', e.message);
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, senderName, intl]);

  const handleKeyDown = useCallback((e) => {
    if (e.keyCode === KeyboardKeyCodes.Enter) {
      handleSubmitSenderName();
    }
  }, [handleSubmitSenderName]);

  const handleChangeMode = useCallback(async ({ target: { checked } }, mode) => {
    const value = checked ? mode : PhoneOwnershipValidationMethods.None;
    try {
      await dispatch(merchantUpdateFlow({
        verificationPatterns: {
          [VerificationPatternTypes.PhoneOwnershipValidation]: value,
        },
      }));
      setModeCurrentMethod(value);
    } catch (e) {
      console.error('error', e.message);
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    }
  }, [dispatch, intl]);

  return (
    <FormControl component="fieldset" height="100%">
      <Grid container flow="row" spacing={1}>
        <Grid item xs={12}>
          <Box className={classes.titleContainer}>
            <Box>
              <Typography variant="h4">
                {intl.formatMessage({ id: 'Product.configuration.phoneValidation' })}
              </Typography>
            </Box>
            <Box>
              <Switch
                name="phoneSms"
                color="primary"
                size="small"
                checked={currentMethod === PhoneOwnershipValidationMethods.Sms}
                onChange={(e) => handleChangeMode(e, PhoneOwnershipValidationMethods.Sms)}
                disabled={isLoading}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Box color="common.black75">
            <Typography variant="body1">
              {intl.formatMessage({ id: 'Product.configuration.phoneValidation.subtitle' })}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <BoxBordered borderColor={appPalette.yellow}>
            <Warning
              label={intl.formatMessage({ id: 'Product.configuration.phoneValidation.webSdkOnlyWarning' })}
            />
          </BoxBordered>
        </Grid>
        <Grid item width="100%">
          <Box mt={1} mb={0.5}>
            <Typography variant="h5">
              {intl.formatMessage({ id: 'Product.configuration.phoneValidation.senderName' })}
            </Typography>
          </Box>
          <Box color="common.black75" mb={1}>
            <Typography variant="body1">
              {intl.formatMessage({ id: 'Product.configuration.phoneValidation.senderName.subtitle' })}
            </Typography>
          </Box>
          <TextFieldName
            type="text"
            value={senderName}
            onChange={handleNameChange}
            onKeyDown={handleKeyDown}
            placeholder=""
            error={!!error}
            helperText={error && intl.formatMessage({ id: error })}
            className={classes.input}
            disabled={isLoading || currentMethod === PhoneOwnershipValidationMethods.None}
          />

        </Grid>
        <Grid item>
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={isLoading && <PageLoader size={14} />}
              onClick={handleSubmitSenderName}
              disabled={isLoading || currentMethod === PhoneOwnershipValidationMethods.None}
            >
              {intl.formatMessage({ id: 'Product.configuration.phoneValidation.save' })}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </FormControl>
  );
}

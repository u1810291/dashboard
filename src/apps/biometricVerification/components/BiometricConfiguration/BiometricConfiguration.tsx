import { Box, RadioGroup, FormControlLabel, Switch, Grid } from '@material-ui/core';
import { appPalette } from 'apps/theme';
import { BoxBordered, Warning, WarningSize, WarningTypes, RadioButton, ExtendedDescription } from 'apps/ui';
import React, { useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import livenessDemoImage from 'assets/livenessDemo.png';
import livenessDemoVideo from 'assets/livenessDemo.mp4';
import { useSelector } from 'react-redux';
import { MerchantTags } from 'models/Merchant.model';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { getVerificationType, hasVoiceVerification, getBiometricType, BiometricVerificationTypes } from '../../models/BiometricVerification.model';
import { useStyles } from './BiometricConfiguration.styles';

export function BiometricConfiguration({ duplicateFaceDetection, biometrics, proofOfOwnership, onUpdate, onPatternsChange }: {
  biometrics: string | null;
  proofOfOwnership: boolean;
  onUpdate: (biometrics: string | null) => void;
  duplicateFaceDetection?: boolean;
  onPatternsChange?: () => void;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const merchantTags: MerchantTags[] = useSelector(selectMerchantTags);
  const isDuplicateFaceDetectionEnabled = useMemo(() => (merchantTags.includes(MerchantTags.CanUseDuplicateFaceDetection)), [merchantTags]);
  const { verificationType, hasVoiceCheck } = useMemo(() => ({
    verificationType: getVerificationType(biometrics),
    hasVoiceCheck: hasVoiceVerification(biometrics),
  }), [biometrics]);
  const voiceCheckDisabled = useMemo(() => ((verificationType === BiometricVerificationTypes.SelfiePhoto) || proofOfOwnership), [verificationType, proofOfOwnership]);
  const handleVerificationTypeChange = useCallback(({ target: { value } }) => {
    onUpdate(getBiometricType(value, hasVoiceCheck));
  }, [hasVoiceCheck, onUpdate]);
  const handleVoiceCheckChange = useCallback(({ target: { checked } }) => {
    onUpdate(getBiometricType(verificationType, checked));
  }, [verificationType, onUpdate]);

  return (
    <Box className={classes.root}>
      {isDuplicateFaceDetectionEnabled && (
        <Box mb={4}>
          <ExtendedDescription
            title={intl.formatMessage({ id: 'Biometrics.settings.duplicateFaceDetection.title' })}
            text={intl.formatMessage({ id: 'Biometrics.settings.duplicateFaceDetection.description' })}
            postfix={(
              <Switch
                checked={duplicateFaceDetection}
                onClick={onPatternsChange}
                color="primary"
              />
            )}
          />
        </Box>
      )}
      <RadioGroup
        aria-label="biometric-step"
        name="biometric-steps"
        value={verificationType}
        onChange={handleVerificationTypeChange}
      >
        <BoxBordered mb={2}>
          <FormControlLabel
            value={BiometricVerificationTypes.SelfieVideo}
            control={<RadioButton color="primary" />}
            label={(
              <Box>
                <Grid container wrap="nowrap" alignItems="flex-start" justify="space-between">
                  <Box>
                    <Box mb={0.5} color="common.black90" fontWeight="bold">
                      {intl.formatMessage({ id: 'Biometrics.settings.selfieVideo' })}
                    </Box>
                    <Box color="common.black75" lineHeight={1.2}>
                      {intl.formatMessage({ id: 'Biometrics.settings.selfieVideo.description' })}
                    </Box>
                  </Box>
                  <Box ml={2} className={classes.media}>
                    <video muted autoPlay playsInline loop src={livenessDemoVideo} />
                  </Box>
                </Grid>
                <Box mt={2}>
                  <Box mb={1}>
                    <Grid container wrap="nowrap" alignItems="center" justify="space-between">
                      <Box color="common.black90" fontWeight="bold">
                        {intl.formatMessage({ id: 'Biometrics.settings.selfieVideoAndVoice' })}
                      </Box>
                      <Box flexShrink={0}>
                        <Switch
                          color="primary"
                          disabled={voiceCheckDisabled}
                          checked={hasVoiceCheck}
                          onChange={handleVoiceCheckChange}
                        />
                      </Box>
                    </Grid>
                  </Box>
                  <Box color="common.black75" lineHeight={1.2} pr={3}>
                    {intl.formatMessage({ id: 'Biometrics.settings.selfieVideoAndVoice.description' })}
                  </Box>
                  <BoxBordered borderColor={appPalette.yellow} mt={1}>
                    <Warning
                      type={WarningTypes.Warning}
                      size={WarningSize.Large}
                      label={intl.formatMessage({ id: 'Biometrics.settings.selfieVideoAndVoice.warning' })}
                    />
                  </BoxBordered>
                  {proofOfOwnership && (
                    <BoxBordered borderColor={appPalette.yellow} mt={1}>
                      <Warning
                        type={WarningTypes.Warning}
                        size={WarningSize.Large}
                        label={intl.formatMessage({ id: 'Biometrics.settings.proofOfOwnerwship.warning' })}
                      />
                    </BoxBordered>
                  )}
                </Box>
              </Box>
            )}
          />
        </BoxBordered>
        <BoxBordered>
          <FormControlLabel
            value={BiometricVerificationTypes.SelfiePhoto}
            control={<RadioButton color="primary" />}
            label={(
              <Grid container wrap="nowrap" alignItems="flex-start" justify="space-between">
                <Box>
                  <Box mb={0.5} color="common.black90" fontWeight="bold">
                    {intl.formatMessage({ id: 'Biometrics.settings.selfiePhoto' })}
                  </Box>
                  <Box color="common.black75" lineHeight={1.2}>
                    {intl.formatMessage({ id: 'Biometrics.settings.selfiePhoto.description' })}
                  </Box>
                </Box>
                <Box ml={2} className={classes.media}>
                  <img alt="" src={livenessDemoImage} />
                </Box>
              </Grid>
            )}
          />
        </BoxBordered>
      </RadioGroup>
    </Box>
  );
}

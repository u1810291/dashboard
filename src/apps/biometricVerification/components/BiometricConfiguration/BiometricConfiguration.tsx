import React, { useMemo, useCallback, useState } from 'react';
import { appPalette } from 'apps/theme';
import { BoxBordered, Warning, WarningSize, WarningTypes, RadioButton, ExtendedDescription } from 'apps/ui';
import livenessDemoImage from 'assets/livenessDemo.png';
import livenessDemoVideo from 'assets/livenessDemo.mp4';
import { useSelector } from 'react-redux';
import { MerchantTags } from 'models/Merchant.model';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { useFormatMessage } from 'apps/intl';
import { getVerificationType, hasVoiceVerification, getBiometricType, BiometricVerificationTypes, BiometricVerificationThresholdErrorTypes, hasDuplicateFaceDetectionThresholdError, MIN_DUPLICATE_FACE_DETECTION_THRESHOLD, MAX_DUPLICATE_FACE_DETECTION_THRESHOLD, MAX_DUPLICATE_FACE_DETECTION_THRESHOLD_FRACTION } from '../../models/BiometricVerification.model';
import { useStyles } from './BiometricConfiguration.styles';

export function BiometricConfiguration({ duplicateFaceDetection, duplicateFaceDetectionThreshold, biometrics, proofOfOwnership, isReVerification, onUpdate, onThresholdChange, onPatternsChange }: {
  biometrics: Nullable<string>;
  proofOfOwnership: boolean;
  onUpdate: (biometrics: Nullable<string>) => void;
  duplicateFaceDetection?: boolean;
  duplicateFaceDetectionThreshold?: number;
  isReVerification?: boolean;
  onThresholdChange?: (threshold: Nullable<number>) => void;
  onPatternsChange?: () => void;
}) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const [score, setScore] = useState<Nullable<string>>(duplicateFaceDetectionThreshold?.toString() || null);
  const [thresholdError, setThresholdError] = useState<Nullable<BiometricVerificationThresholdErrorTypes>>(null);
  const merchantTags = useSelector<any, MerchantTags[]>(selectMerchantTags);

  const isDuplicateFaceDetectionEnabled = useMemo<boolean>(() => (merchantTags.includes(MerchantTags.CanUseDuplicateFaceDetection)), [merchantTags]);

  const { verificationType, hasVoiceCheck } = useMemo<{
    verificationType: BiometricVerificationTypes;
    hasVoiceCheck: boolean;
  }>(() => ({
    verificationType: getVerificationType(biometrics),
    hasVoiceCheck: hasVoiceVerification(biometrics),
  }), [biometrics]);

  const voiceCheckDisabled = useMemo<boolean>(() => ((verificationType === BiometricVerificationTypes.SelfiePhoto) || proofOfOwnership), [verificationType, proofOfOwnership]);
  const handleVerificationTypeChange = useCallback(({ target: { value } }) => {
    onUpdate(getBiometricType(value, hasVoiceCheck));
  }, [hasVoiceCheck, onUpdate]);

  const handleVoiceCheckChange = useCallback(({ target: { checked } }) => {
    onUpdate(getBiometricType(verificationType, checked));
  }, [verificationType, onUpdate]);

  const handleScoreChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (thresholdError) {
      setThresholdError(null);
    }
    const [integer, fraction] = event.target.value.split('.');
    let result = integer;
    if (fraction) {
      result += `.${fraction.slice(0, MAX_DUPLICATE_FACE_DETECTION_THRESHOLD_FRACTION)}`;
    }
    setScore(result);
  }, [thresholdError]);

  const handleValidation = useCallback((threshold: number) => () => {
    if (hasDuplicateFaceDetectionThresholdError(threshold)) {
      setThresholdError(BiometricVerificationThresholdErrorTypes.OutOfRange);
    }
    onThresholdChange(threshold);
  }, [onThresholdChange]);

  return (
    <Box className={classes.root}>
      {!isReVerification && isDuplicateFaceDetectionEnabled && (
        <Box mb={4}>
          <ExtendedDescription
            title={formatMessage('Biometrics.settings.duplicateFaceDetection.title')}
            text={formatMessage('Biometrics.settings.duplicateFaceDetection.description')}
            postfix={(
              <Switch
                checked={duplicateFaceDetection}
                onClick={onPatternsChange}
                color="primary"
              />
            )}
          />
          <BoxBordered mt={2}>
            <Box mb={1} color="common.black90" fontWeight="bold">
              {formatMessage('Biometrics.settings.duplicateUserDetection.threshold.title')}
            </Box>
            <TextField
              disabled={!duplicateFaceDetection}
              type="number"
              variant="outlined"
              value={score}
              onChange={handleScoreChange}
              onBlur={handleValidation(parseFloat(score))}
              helperText={thresholdError && formatMessage(`Biometrics.settings.duplicateUserDetection.threshold.error.${thresholdError}`)}
              placeholder={`${MIN_DUPLICATE_FACE_DETECTION_THRESHOLD}-${MAX_DUPLICATE_FACE_DETECTION_THRESHOLD}`}
              error={!!thresholdError}
            />
            <Box mt={1} color="common.black75">
              {formatMessage('Biometrics.settings.duplicateUserDetection.threshold.description')}
            </Box>
          </BoxBordered>
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
                      {formatMessage('Biometrics.settings.selfieVideo')}
                    </Box>
                    <Box color="common.black75" lineHeight={1.2}>
                      {formatMessage('Biometrics.settings.selfieVideo.description')}
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
                        {formatMessage('Biometrics.settings.selfieVideoAndVoice')}
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
                    {formatMessage('Biometrics.settings.selfieVideoAndVoice.description')}
                  </Box>
                  <BoxBordered borderColor={appPalette.yellow} mt={1}>
                    <Warning
                      type={WarningTypes.Warning}
                      size={WarningSize.Large}
                      label={formatMessage('Biometrics.settings.selfieVideoAndVoice.warning')}
                    />
                  </BoxBordered>
                  {proofOfOwnership && (
                    <BoxBordered borderColor={appPalette.yellow} mt={1}>
                      <Warning
                        type={WarningTypes.Warning}
                        size={WarningSize.Large}
                        label={formatMessage('Biometrics.settings.proofOfOwnerwship.warning')}
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
                    {formatMessage('Biometrics.settings.selfiePhoto')}
                  </Box>
                  <Box color="common.black75" lineHeight={1.2}>
                    {formatMessage('Biometrics.settings.selfiePhoto.description')}
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

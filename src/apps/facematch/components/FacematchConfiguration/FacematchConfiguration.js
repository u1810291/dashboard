import { Box, Button, FormControl, Grid, RadioGroup, Switch, Typography } from '@material-ui/core';
import { PageLoader } from 'apps/layout';
import { appPalette } from 'apps/theme';
import { BoxBordered, notification, Warning, WarningSize, WarningTypes } from 'apps/ui';
import { ErrorMessages } from 'models/Error.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { selectCanUseProofOfOwnership } from 'apps/ProofOfOwnership';
import { selectIsVoiceLiveness } from 'state/merchant/merchant.selectors';
import { RadioFacematchMode } from '../RadioFacematchMode/RadioFacematchMode';
import { FACEMATCH_DEFAULT_THRESHOLD, FACEMATCH_THRESHOLDS, FacematchThresholdModes, validateScore } from '../../models/facematch.model';
import { selectFacematchThreshold, selectProofOfOwnership } from '../../state/facematch.selectors';
import { InputScore } from './FacematchConfiguration.styles';

export function FacematchConfiguration() {
  const intl = useIntl();
  const dispatch = useDispatch();

  const initialScore = useSelector(selectFacematchThreshold);
  const canUseProofOfOwnership = useSelector(selectCanUseProofOfOwnership);
  const proofOfOwnership = useSelector(selectProofOfOwnership);

  const [isLoading, setLoading] = useState(false);
  const [isPOOLoading, setIsPOOLoading] = useState(false);
  const [mode, setMode] = useState(initialScore ? FacematchThresholdModes.Custom : FacematchThresholdModes.Recommended);
  const [score, setScore] = useState(initialScore);
  const [error, setError] = useState(validateScore(score, mode));
  const [isPOO, setIsPOO] = useState(false);
  const isVoice = useSelector(selectIsVoiceLiveness);

  const handleModeChange = useCallback(({ target: { value } }) => {
    setMode(value);
    setScore(initialScore || FACEMATCH_DEFAULT_THRESHOLD);
    setError(null);
  }, [initialScore]);

  const handleScoreChange = useCallback(({ target: { value } }) => {
    setScore(value);
    setError(null);
  }, []);

  const handlePOOChange = useCallback(async (event) => {
    const prev = isPOO;
    const value = event.target.checked;
    setIsPOOLoading(true);
    try {
      setIsPOO(value);
      await dispatch(merchantUpdateFlow({
        verificationPatterns: {
          [VerificationPatternTypes.ProofOfOwnership]: value,
        },
      }));
    } catch (e) {
      setIsPOO(prev);
      console.error('can\'t save POO', e);
      notification.error(ErrorMessages.ERROR_COMMON);
    }
    setIsPOOLoading(false);
  }, [dispatch, isPOO]);

  const handleSave = useCallback(async () => {
    const scoreAsNumber = parseInt(score, 10);
    const validationError = validateScore(scoreAsNumber, mode);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      setLoading(true);
      await dispatch(merchantUpdateFlow({
        facematchThreshold: mode === FacematchThresholdModes.Custom ? scoreAsNumber : null,
      }));
    } catch (err) {
      notification.error(ErrorMessages.ERROR_COMMON);
    } finally {
      setLoading(false);
    }
  }, [dispatch, mode, score]);

  useEffect(() => {
    setMode(initialScore ? FacematchThresholdModes.Custom : FacematchThresholdModes.Recommended);
    setScore(initialScore);
    setError(null);
  }, [initialScore]);

  useEffect(() => {
    setIsPOO(proofOfOwnership);
  }, [proofOfOwnership]);

  return (
    <Box>
      <FormControl component="fieldset">
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h4">
              {intl.formatMessage({ id: 'Product.configuration.facematch' })}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="textSecondary">
              {intl.formatMessage({ id: 'Product.configuration.facematch.subtitle' })}
            </Typography>
          </Grid>

          <Grid item>
            <RadioGroup
              aria-label="facematch-configuration"
              name="facematch-configuration"
              value={mode}
              onChange={handleModeChange}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <BoxBordered>
                    <RadioFacematchMode
                      mode={FacematchThresholdModes.Recommended}
                      disabled={isLoading}
                      subtitle={intl.formatMessage({ id: 'Product.configuration.facematch.mode.recommended.subtitle' })}
                    />
                  </BoxBordered>
                </Grid>
                <Grid item>
                  <BoxBordered>
                    <RadioFacematchMode
                      mode={FacematchThresholdModes.Custom}
                      disabled={isLoading}
                      expandable
                      subtitle={(
                        <Box py={1}>
                          <Grid container spacing={1}>
                            <Grid item>
                              <Typography component="div" display="inline">
                                <Box display="inline" fontWeight="bold">
                                  {`${FACEMATCH_THRESHOLDS.LOW.MIN}-${FACEMATCH_THRESHOLDS.LOW.MAX}%`}
                                </Box>
                                {' - '}
                              </Typography>
                              {intl.formatMessage({
                                id: 'Product.configuration.facematch.mode.custom.subtitle.lower',
                              }, {
                                bold: (msg) => (
                                  <Box display="inline" fontWeight="bold">{msg}</Box>),
                              })}
                            </Grid>
                            <Grid item>
                              <Typography component="div" display="inline">
                                <Box display="inline" fontWeight="bold">
                                  {`${FACEMATCH_THRESHOLDS.HIGH.MIN}-${FACEMATCH_THRESHOLDS.HIGH.MAX}%`}
                                </Box>
                                {' - '}
                              </Typography>
                              {intl.formatMessage({
                                id: 'Product.configuration.facematch.mode.custom.subtitle.higher',
                              }, {
                                bold: (msg) => (
                                  <Box display="inline" fontWeight="bold">{msg}</Box>),
                              })}
                            </Grid>
                          </Grid>
                        </Box>
                      )}
                    >
                      <InputScore
                        type="number"
                        disabled={mode !== FacematchThresholdModes.Custom || isLoading}
                        value={score || ''}
                        onChange={handleScoreChange}
                        placeholder={mode === FacematchThresholdModes.Custom ? ' ' : FACEMATCH_DEFAULT_THRESHOLD.toString()}
                        error={!!error}
                        helperText={error && intl.formatMessage({ id: `Product.configuration.facematch.mode.custom.errors.${error}` })}
                      />
                    </RadioFacematchMode>
                  </BoxBordered>
                </Grid>
              </Grid>
            </RadioGroup>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={isLoading && <PageLoader size={14} />}
              onClick={handleSave}
              disabled={isLoading}
            >
              {intl.formatMessage({ id: 'Product.configuration.facematch.save' })}
            </Button>
          </Grid>
        </Grid>
      </FormControl>

      {/* proof of ownership */}
      {canUseProofOfOwnership && (
        <BoxBordered mt={2}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="h5">
                {intl.formatMessage({ id: 'ProofOfOwnership.title' })}
              </Typography>
            </Box>
            <Box flexGrow={0}>
              <Switch
                name="proofOfOwnership"
                color="primary"
                size="small"
                checked={isPOO}
                disabled={isPOOLoading || isVoice}
                onChange={handlePOOChange}
              />
            </Box>
          </Box>
          <Box mt={1}>
            <Typography variant="body1" color="textSecondary">
              {intl.formatMessage({ id: 'ProofOfOwnership.description' })}
            </Typography>
          </Box>

          {isVoice && (
            <BoxBordered borderColor={appPalette.yellow} mt={1}>
              <Warning
                type={WarningTypes.Warning}
                size={WarningSize.Large}
                label={intl.formatMessage({ id: 'ProofOfOwnership.voiceLiveness.warning' })}
              />
            </BoxBordered>
          )}
        </BoxBordered>
      )}
    </Box>
  );
}

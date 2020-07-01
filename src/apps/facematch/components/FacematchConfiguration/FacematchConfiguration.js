import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { notification } from 'components/notification';
import { ERROR_COMMON } from 'models/Error.model';
import { merchantUpdateFlow } from '../../../../state/merchant/merchant.actions';
import { selectCurrentFlowId } from '../../../../state/merchant/merchant.selectors';
import { BoxRoundBordered, InputScore } from './FacematchConfiguration.styles';
import { selectFacematchThreshold } from '../../state/facematch.selectors';
import RadioFacematchMode from '../RadioFacematchMode/RadioFacematchMode';
import {
  FacematchThresholdModes,
  FACEMATCH_MIN_THRESHOLD,
  FACEMATCH_DEFAULT_THRESHOLD,
  FACEMATCH_MAX_THRESHOLD,
  validateScore,
} from '../../models/facematch.model';

export const FacematchConfiguration = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const flowId = useSelector(selectCurrentFlowId);
  const initialScore = useSelector(selectFacematchThreshold);

  const [isLoading, setLoading] = useState(false);
  const [mode, setMode] = useState(initialScore ? FacematchThresholdModes.Custom : FacematchThresholdModes.Recommended);
  const [score, setScore] = useState(initialScore);
  const [error, setError] = useState(validateScore(score, mode));

  const handleModeChange = useCallback(({ target: { value } }) => {
    setMode(value);
    setScore(initialScore || FACEMATCH_DEFAULT_THRESHOLD);
    setError(null);
  }, [initialScore]);

  const handleScoreChange = useCallback(({ target: { value } }) => {
    setScore(value);
    setError(null);
  }, []);

  const handleSave = useCallback(async () => {
    const scoreAsNumber = parseInt(score, 10);
    const validationError = validateScore(scoreAsNumber, mode);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      setLoading(true);
      await dispatch(merchantUpdateFlow(flowId, {
        facematchThreshold: mode === FacematchThresholdModes.Custom ? scoreAsNumber : null,
      }));
    } catch (err) {
      notification.error(ERROR_COMMON);
    } finally {
      setLoading(false);
    }
  }, [dispatch, flowId, mode, score]);

  useEffect(() => {
    setMode(initialScore ? FacematchThresholdModes.Custom : FacematchThresholdModes.Recommended);
    setScore(initialScore);
    setError(null);
  }, [initialScore, flowId]);

  return (
    <FormControl component="fieldset">
      <Grid container flow="row" spacing={1}>
        <Grid item>
          <Typography variant="h4">
            {intl.formatMessage({ id: 'Product.configuration.facematch' })}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
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
                <BoxRoundBordered>
                  <RadioFacematchMode
                    mode={FacematchThresholdModes.Recommended}
                    disabled={isLoading}
                    subtitle={intl.formatMessage({ id: 'Product.configuration.facematch.mode.recommended.subtitle' })}
                  />
                </BoxRoundBordered>
              </Grid>
              <Grid item>
                <BoxRoundBordered>
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
                                {`${FACEMATCH_MIN_THRESHOLD}-${FACEMATCH_DEFAULT_THRESHOLD}%`}
                              </Box>
                              {' - '}
                            </Typography>
                            {intl.formatMessage({ id: 'Product.configuration.facematch.mode.custom.subtitle.lower' })}
                          </Grid>
                          <Grid item>
                            <Typography component="div" display="inline">
                              <Box display="inline" fontWeight="bold">
                                {`${FACEMATCH_DEFAULT_THRESHOLD}-${FACEMATCH_MAX_THRESHOLD}%`}
                              </Box>
                              {' - '}
                            </Typography>
                            {intl.formatMessage({ id: 'Product.configuration.facematch.mode.custom.subtitle.higher' })}
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
                </BoxRoundBordered>
              </Grid>
            </Grid>
          </RadioGroup>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={isLoading && <CircularProgress color="secondary" size={14} />}
            onClick={handleSave}
            disabled={isLoading}
          >
            {intl.formatMessage({ id: 'Product.configuration.facematch.save' })}
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  );
};

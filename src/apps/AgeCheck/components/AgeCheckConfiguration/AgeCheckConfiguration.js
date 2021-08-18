import { Box, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@material-ui/core';
import { PageLoader } from 'apps/layout';
import { BoxBordered, notification } from 'apps/ui';
import { ErrorMessages } from 'models/Error.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { merchantUpdateFlow } from 'state/merchant/merchant.actions';
import { AGE_CHECK_DEFAULT_THRESHOLD, AGE_CHECK_MAX_THRESHOLD, AGE_CHECK_MIN_THRESHOLD, AgeCheckThresholdModes, validateAgeTheshold } from '../../models/AgeCheck.model';
import { selectAgeCheckThreshold } from '../../state/AgeCheck.selectors';
import { InputScore, useStyles } from './AgeCheckConfiguration.styles';

export function AgeCheckConfiguration() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialScore = useSelector(selectAgeCheckThreshold);

  const [isLoading, setLoading] = useState(false);
  const [mode, setMode] = useState(initialScore ? AgeCheckThresholdModes.Custom : AgeCheckThresholdModes.Default);
  const [score, setScore] = useState(initialScore);
  const [error, setError] = useState(validateAgeTheshold(score, mode));

  const handleModeChange = useCallback(({ target: { value } }) => {
    setMode(value);
    setScore(initialScore || AGE_CHECK_DEFAULT_THRESHOLD);
    setError(null);
  }, [initialScore]);

  const handleScoreChange = useCallback(({ target: { value } }) => {
    setScore(value);
    setError(null);
  }, []);

  const handleBlur = useCallback(({ target: { value } }) => {
    setError(validateAgeTheshold(parseInt(value, 10), mode));
  }, [mode]);

  const handleSave = useCallback(async () => {
    const scoreAsNumber = parseInt(score, 10);
    const validationError = validateAgeTheshold(scoreAsNumber, mode);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      setLoading(true);
      await dispatch(merchantUpdateFlow({
        ageThreshold: mode === AgeCheckThresholdModes.Custom ? scoreAsNumber : AGE_CHECK_DEFAULT_THRESHOLD,
      }));
    } catch (err) {
      notification.error(ErrorMessages.ERROR_COMMON);
    } finally {
      setLoading(false);
    }
  }, [dispatch, mode, score]);

  useEffect(() => {
    setMode(!initialScore || initialScore === AGE_CHECK_DEFAULT_THRESHOLD ? AgeCheckThresholdModes.Default : AgeCheckThresholdModes.Custom);
    setScore(initialScore);
    setError(null);
  }, [initialScore]);

  return (
    <FormControl component="fieldset" className={classes.fullHeight}>
      <Grid container flow="row" spacing={1}>
        <Grid item>
          <Typography variant="h4">
            {intl.formatMessage({ id: 'Product.configuration.ageCheck' })}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            {intl.formatMessage({ id: 'Product.configuration.ageCheck.subtitle' })}
          </Typography>
        </Grid>
        <Grid item className={classes.fullWidth}>
          <RadioGroup
            aria-label="age-check-configuration"
            name="age-check-configuration"
            value={mode}
            onChange={handleModeChange}
          >
            <Grid container spacing={2}>
              <Grid item className={classes.fullWidth}>
                <BoxBordered>
                  <FormControlLabel
                    control={<Radio color="default" disabled={isLoading} />}
                    label={(
                      <Typography variant="h5">
                        {intl.formatMessage({ id: 'Product.configuration.ageCheck.default.title' })}
                      </Typography>
                    )}
                    value={AgeCheckThresholdModes.Default}
                  />
                  <Box pl={3}>
                    <Typography component="div" variant="body2">
                      {intl.formatMessage({ id: 'Product.configuration.ageCheck.default.subtitle' })}
                    </Typography>
                  </Box>

                </BoxBordered>
              </Grid>
              <Grid item className={classes.fullWidth}>
                <BoxBordered>
                  <FormControlLabel
                    control={<Radio color="default" disabled={isLoading} />}
                    label={(
                      <Typography variant="h5">
                        {intl.formatMessage({ id: 'Product.configuration.ageCheck.custom.title' })}
                      </Typography>
                    )}
                    value={AgeCheckThresholdModes.Custom}
                  />
                  <Box className={classes.flexContainer} pb={1}>
                    <Box pl={3} height="50px">
                      <InputScore
                        type="number"
                        disabled={mode !== AgeCheckThresholdModes.Custom || isLoading}
                        value={mode === AgeCheckThresholdModes.Custom ? score : ''}
                        onBlur={handleBlur}
                        onChange={handleScoreChange}
                        placeholder={`${AGE_CHECK_MIN_THRESHOLD}-${AGE_CHECK_MAX_THRESHOLD}`}
                        error={!!error}
                        helperText={error && intl.formatMessage({ id: `Product.configuration.ageCheck.custom.${error}` })}
                      />
                    </Box>
                    <Box ml={1}>
                      <Typography variant="body1">
                        {intl.formatMessage({ id: 'Product.configuration.ageCheck.custom.subtitle' })}
                      </Typography>
                    </Box>
                  </Box>
                </BoxBordered>
              </Grid>
            </Grid>
          </RadioGroup>
        </Grid>
      </Grid>
      <Box className={classes.bottom}>
        <Button
          variant="contained"
          color="primary"
          startIcon={isLoading && <PageLoader size={14} />}
          onClick={handleSave}
          disabled={isLoading}
        >
          {intl.formatMessage({ id: 'Product.configuration.facematch.save' })}
        </Button>
      </Box>
    </FormControl>
  );
}

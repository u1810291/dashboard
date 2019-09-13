import { omit } from 'lodash';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Drawer,
  Grid,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { notification } from 'components/notification';
import { useDispatch, useSelector } from 'react-redux';
import { saveConfiguration } from 'state/merchant';
import { ThemeProvider } from '@material-ui/styles';
import { ReactComponent as MatiLogo } from 'assets/mati-logo-icon.svg';
import { useStyles, theme } from './styles';

const useSignUpForm = () => {
  const [inputs, setInputs] = useState({});

  const handleInputChange = (event) => {
    event.persist();
    setInputs((formInputs) => ({
      ...formInputs,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleInputChange,
    inputs,
  };
};

const QuestionsContent = () => {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { inputs, handleInputChange } = useSignUpForm();
  const token = useSelector((s) => s.auth.token);
  const dashboard = useSelector((s) => s.merchant.configuration.dashboard);

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    try {
      await dispatch(
        saveConfiguration(token, {
          dashboard: {
            ...omit(dashboard, 'shouldPassOnboarding'),
            info: inputs,
          },
        }),
      );
    } catch (err) {
      notification.info('Error saving configuration');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={3} className={classes.grid}>
        <Grid item>
          <MatiLogo />
        </Grid>

        <Grid item container spacing={3}>
          <Grid item>
            <Typography variant="h4">
              {intl.formatMessage({ id: 'questions.title' })}
            </Typography>
            <Typography variant="subtitle1">
              {intl.formatMessage({ id: 'questions.subtitle' })}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container spacing={3} direction="column">
          <Grid item>
            <TextField
              required
              name="organization"
              value={inputs.organization}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.organization' })}
            />
          </Grid>
          <Grid item>
            <TextField
              name="websiteUrl"
              value={inputs.websiteUrl}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.website-url' })}
            />
          </Grid>
        </Grid>

        <Grid item container direction="row" spacing={2}>
          {intl.formatMessage({ id: 'questions.when-start.title' })}
          <RadioGroup
            aria-label="when"
            name="when"
            className={classes.radioGroup}
          >
            <FormControlLabel
              value="now"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.when-start.b1' })}
            />
            <FormControlLabel
              value="weeks"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.when-start.b2' })}
            />
            <FormControlLabel
              value="month"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.when-start.b3' })}
            />
            <FormControlLabel
              value="dontknow"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.when-start.b4' })}
            />
          </RadioGroup>
        </Grid>

        <Grid item container direction="row" spacing={2}>
          {intl.formatMessage({ id: 'questions.how-many.title' })}
          <RadioGroup
            aria-label="howmany"
            name="howmany"
            className={classes.radioGroup}
          >
            <FormControlLabel
              value="less100"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.when-start.b1' })}
            />
            <FormControlLabel
              value="from100to1k"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.when-start.b2' })}
            />
            <FormControlLabel
              value="morethan1k"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.when-start.b3' })}
            />
            <FormControlLabel
              value="idontknow"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.when-start.b4' })}
            />
          </RadioGroup>
        </Grid>

        <Grid item>
          <Button type="submit" color="primary" variant="contained">
            {intl.formatMessage({ id: 'questions.how-many.submit' })}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const Questions = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Drawer anchor="left" variant="persistent" open>
          <QuestionsContent />
        </Drawer>
      </div>
    </ThemeProvider>
  );
};

export default Questions;

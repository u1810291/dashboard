import { Box, Button, Drawer, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { ReactComponent as MatiLogo } from 'assets/mati-logo-icon.svg';
import { notification } from 'components/notification';
import 'intl-tel-input/build/css/intlTelInput.min.css';
import { contactProperties } from 'lib/hubspot';
import { difference, isEmpty, omitBy } from 'lodash';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import ReactIntlTelInput from 'react-intl-tel-input-v2';
import { useDispatch } from 'react-redux';
import { hubspotTrack } from 'state/hubspot/hubspot.actions';
import { onboardingUpdate } from 'state/merchant/merchant.actions';
import { theme, useStyles } from './Questions.styles';

const mandatoryFields = [
  'organization',
  'websiteUrl',
  'whenToStart',
  'verificationsVolume',
  'whyDoYouNeedMati',
];

function QuestionsContent() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [disabled, handleDisabled] = useState(true);
  const [phone, setPhone] = useState({ iso2: 'us', dialCode: '1', phone: '' });

  const inputProps = {
    placeholder: 'Phone number',
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((formInputs) => {
      const updated = {
        ...formInputs,
        [event.target.name]: event.target.value,
      };
      const currentFields = Object.keys(omitBy(updated, isEmpty));
      if (difference(mandatoryFields, currentFields).length === 0) {
        handleDisabled(false);
      } else {
        handleDisabled(true);
      }
      return updated;
    });
  };

  const handleSubmit = useCallback(async (event) => {
    if (event) {
      event.preventDefault();
    }
    inputs.phone = `+${phone.dialCode} ${phone.phone}`;
    try {
      await dispatch(onboardingUpdate(inputs));
      dispatch(hubspotTrack({
        [contactProperties.companyName]: inputs.organization,
        [contactProperties.website]: inputs.websiteUrl,
        [contactProperties.startVerifyingUsers]: inputs.whenToStart,
        [contactProperties.verificationsVolume]: inputs.verificationsVolume,
        [contactProperties.whyDoYouNeedMati]: inputs.whyDoYouNeedMati,
        [contactProperties.phoneNumber]: inputs.phone,
      }));
    } catch (err) {
      notification.info('Error saving configuration');
    }
  }, [dispatch, phone, inputs]);


  return (
    <form onSubmit={handleSubmit} id="signup_form">
      <Grid container direction="column" spacing={3} className={classes.grid}>
        <MatiLogo />

        <Grid item container spacing={3}>
          <Typography variant="h4">
            {intl.formatMessage({ id: 'questions.title' })}
          </Typography>
        </Grid>
        <Box my={1} width={1}>
          <TextField
            required
            name="organization"
            value={inputs.organization}
            onChange={handleInputChange}
            label={intl.formatMessage({ id: 'questions.organization' })}
          />
        </Box>
        <Box my={1} width={1}>
          <TextField
            required
            name="websiteUrl"
            value={inputs.websiteUrl}
            onChange={handleInputChange}
            label={intl.formatMessage({ id: 'questions.website-url' })}
          />
        </Box>
        <Box my={1} width={1}>
          <ReactIntlTelInput
            inputProps={inputProps}
            intlTelOpts={() => ({})}
            value={phone}
            onChange={(value) => setPhone(value)}
            className={classes.phone}
          />
        </Box>

        <Grid item container direction="row" spacing={2}>
          <Box fontWeight={600}>
            {intl.formatMessage({ id: 'questions.when-start.title' })}
          </Box>
          <RadioGroup
            aria-label="when"
            name="whenToStart"
            className={classes.radioGroup}
          >
            <FormControlLabel
              value="now"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.when-start.b1' })}
            />
            <FormControlLabel
              value="next_few_months"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.when-start.b2' })}
            />
            <FormControlLabel
              value="dont_know"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.when-start.b3' })}
            />
          </RadioGroup>
        </Grid>

        <Grid item container direction="column" spacing={2}>
          <Box fontWeight={600}>
            {intl.formatMessage({ id: 'questions.how-many.title' })}
          </Box>
          <RadioGroup
            aria-label="howmany"
            name="verificationsVolume"
            className={classes.radioGroup}
          >
            <FormControlLabel
              value="0_1000"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.how-many.b1' })}
            />
            <FormControlLabel
              value="more_1000"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.how-many.b2' })}
            />
            <FormControlLabel
              value="dont_know"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.how-many.b3' })}
            />
          </RadioGroup>
        </Grid>

        <Grid item container direction="column" spacing={2}>
          <Box component="div" fontWeight={600}>
            {intl.formatMessage({ id: 'questions.why-do-you-need-mati.title' })}
          </Box>
          <RadioGroup
            aria-label="whydoyouneedmati"
            name="whyDoYouNeedMati"
            className={classes.radioGroup}
          >
            <FormControlLabel
              value="fraud"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.why-do-you-need-mati.b1' })}
            />
            <FormControlLabel
              value="compliance"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.why-do-you-need-mati.b2' })}
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              onChange={handleInputChange}
              label={intl.formatMessage({ id: 'questions.why-do-you-need-mati.b3' })}
            />
          </RadioGroup>
        </Grid>

        <Grid item>
          <Button type="submit" color="primary" disabled={disabled} variant="contained">
            {intl.formatMessage({ id: 'questions.how-many.submit' })}
          </Button>
        </Grid>

      </Grid>
    </form>
  );
}

export function Questions() {
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
}

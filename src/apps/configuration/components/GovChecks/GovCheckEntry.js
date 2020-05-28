import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import { useIntl } from 'react-intl';
import { ExpandMore } from '@material-ui/icons';
import { getDefaultGovChecks, getGovChecksByCountry } from 'state/merchant/merchant.model';
import { selectGovChecks } from 'state/merchant/merchant.selectors';
import { configurationFlowUpdate } from 'state/merchant/merchant.actions';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  useStyles,
} from './GovChecksEntry.styles';
import { flags } from './icons';

export function GovChecksEntry({ country, isExpanded = false }) {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(isExpanded);
  const cfgModel = useSelector(selectGovChecks);
  const [govChecks, setGovChecks] = useState({ ...getDefaultGovChecks(), ...cfgModel });

  useEffect(() => {
    setGovChecks({
      ...getDefaultGovChecks(),
      ...cfgModel,
    });
  }, [cfgModel]);

  const handleSwitcher = useCallback((e) => {
    const { checked } = e.target;
    const value = {
      ...govChecks,
      ...{ [e.target.id]: checked },
    };
    setGovChecks(value);
    dispatch(configurationFlowUpdate({ verificationPatterns: value }));
  }, [govChecks, dispatch]);

  const handleChange = useCallback((event, value) => {
    setExpanded(value);
  }, []);

  return (
    <ExpansionPanel
      key={country}
      expanded={expanded}
      onChange={handleChange}
      className={classes.entry}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        aria-controls={`panel-${country}-content`}
        id={`panel-${country}-header`}
      >
        {flags[country]}
        <Box lineHeight="1.7rem" px={1}>
          {intl.formatMessage({ id: `Product.configuration.govChecks.${country}` })}
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        { Object.entries(getGovChecksByCountry(country))
          .map(([check, { label }]) => (
            <Box key={check}>
              <FormControlLabel
                control={(
                  <Switch id={check} checked={govChecks[check]} onChange={handleSwitcher} color="primary" />
                  )}
                label={label}
              />
            </Box>
          ))}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

import { Box, Checkbox, FormControl, FormControlLabel, Grid, Paper, Typography } from '@material-ui/core';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { QATags } from 'models/QA.model';
import { verificationHistoryFilterStructure } from 'models/History.model';
import React from 'react';
import { FiBox } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useFilterCheckbox } from '../../hooks/filterBy.hook';
import { useStyles } from './ByVerificationEventTypes.styles';

export function ByVerificationEventTypes({ bufferedFilter: { eventType }, onFilterChange, eventTypes }) {
  const classes = useStyles();
  const intl = useIntl();
  const [handleSelectAction, checkIsSelected] = useFilterCheckbox(verificationHistoryFilterStructure.eventType, eventType, onFilterChange);

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="subtitle2">
        <Box display="flex" alignItems="center" pb={1}>
          <FiBox />
          <Box ml={0.6} component="span">{intl.formatMessage({ id: 'VerificationHistory.byActions.header' })}</Box>
        </Box>
      </Typography>
      <Paper className={classes.status}>
        <FormControl data-qa={QATags.Filter.byActionTypes} variant="outlined" fullWidth>
          {eventTypes.map((item) => (
            <FormControlLabel
              key={item.id}
              value={item.id}
              checked={checkIsSelected(item.id)}
              control={<Checkbox onChange={handleSelectAction} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />}
              label={intl.formatMessage({ id: `History.filter.eventType.${item.id}` })}
            />
          ))}
        </FormControl>
      </Paper>
    </Grid>
  );
}

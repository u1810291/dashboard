import { Box, Checkbox, FormControl, FormControlLabel, Grid, Paper, Typography } from '@material-ui/core';
import { AgentHistoryEventGroup } from 'apps/agentHistory/models/AgentHistory.model';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { FilterI } from 'models/Filter.model';
import { QATags } from 'models/QA.model';
import { verificationHistoryFilterStructure } from 'models/History.model';
import React from 'react';
import { FiBox } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useFilterCheckbox } from '../../hooks/filterBy.hook';
import { useStyles } from './ByAgentEventGroups.styles';

export function ByAgentEventGroups({ bufferedFilter: { eventType }, onFilterChange, eventGroups }: {
  bufferedFilter?: Pick<FilterI, 'eventType'>;
  onFilterChange?: (filter: FilterI) => void;
  eventGroups?: AgentHistoryEventGroup[];
}) {
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
      <Paper className={classes.eventTypesList}>
        <FormControl data-qa={QATags.Filter.byActionTypes} variant="outlined" fullWidth>
          {eventGroups.map((item) => (
            <FormControlLabel
              key={item.key}
              value={item.value}
              checked={checkIsSelected(item.key)}
              control={<Checkbox onChange={handleSelectAction} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />}
              label={intl.formatMessage({ id: `History.filter.eventType.${item.key}` })}
            />
          ))}
        </FormControl>
      </Paper>
    </Grid>
  );
}

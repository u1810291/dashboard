import { Box, Checkbox, FormControl, FormControlLabel, Grid, Paper, Typography } from '@material-ui/core';
import { useFilterCheckbox } from 'apps/filter/hooks/filterBy.hook';
import { FilterI } from 'models/Filter.model';
import { verificationsFilterStructure } from 'models/Identity.model';
import { QATags } from 'models/QA.model';
import React from 'react';
import { FiBox } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useFlowListLoad } from 'apps/FlowList';
import { PageLoader } from 'apps/layout';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { useStyles } from './ByFlows.styles';

export const ByFlows = ({ bufferedFilter: { flowIds }, onFilterChange }: {
  bufferedFilter?: Partial<FilterI>;
  onFilterChange?: (filter: FilterI) => void;
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const flowListModel = useFlowListLoad();
  const [handleSelectFlow, checkIsSelected] = useFilterCheckbox(verificationsFilterStructure.flowIds, flowIds, onFilterChange);

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="subtitle2">
        <Box display="flex" alignItems="center" pb={1}>
          <FiBox />
          <Box ml={0.6} component="span">{intl.formatMessage({ id: 'VerificationFilter.flows.title' })}</Box>
        </Box>
      </Typography>
      {flowListModel.isLoaded ? (
        <Paper className={classes.flowsList}>
          <FormControl data-qa={QATags.Filter.byFlow} variant="outlined" fullWidth>
            <FormControlLabel
              value=""
              checked={flowIds?.length === 0}
              control={<Checkbox onChange={handleSelectFlow} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />}
              label={intl.formatMessage({ id: 'VerificationFilter.flows.allFlows' })}
            />
            {flowListModel.value.map((item) => (
              <FormControlLabel
                key={item.id}
                value={item.id}
                checked={checkIsSelected(item.id)}
                control={<Checkbox onChange={handleSelectFlow} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />}
                label={item.name}
              />
            ))}
          </FormControl>
        </Paper>
      ) : (
        <PageLoader />
      )}
    </Grid>
  );
};

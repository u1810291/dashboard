import { Box, Checkbox, FormControl, FormControlLabel, Grid, Paper, Typography } from '@material-ui/core';
import { useFilterCheckbox } from 'apps/filter/hooks/filterBy.hook';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { QATags } from 'models/QA.model';
import { verificationHistoryFilterStructure } from 'models/History.model';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectCollaboratorCollection } from 'apps/collaborators/state/collaborator.selectors';
import { useStyles } from './ByAgents.styles';

export function ByAgents({ bufferedFilter: { updatedBy }, onFilterChange }) {
  const classes = useStyles();
  const intl = useIntl();
  const [handleSelectAgent, checkIsSelected] = useFilterCheckbox(verificationHistoryFilterStructure.updatedBy, updatedBy, onFilterChange);
  const collaborators = useSelector(selectCollaboratorCollection);

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="subtitle2">
        <Box display="flex" alignItems="center" pb={1}>
          <FiUser />
          <Box ml={0.6} component="span">{intl.formatMessage({ id: 'VerificationHistory.byAgents.header' })}</Box>
        </Box>
      </Typography>
      <Paper className={classes.status}>
        <FormControl data-qa={QATags.Filter.byAgents} variant="outlined" fullWidth>
          {collaborators.map(({ user }) => (
            <FormControlLabel
              className={classes.label}
              key={user.id}
              value={user?.id}
              checked={checkIsSelected(user?.id)}
              control={<Checkbox onChange={handleSelectAgent} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />}
              label={(
                <>
                  <Box color="common.black90" fontWeight="bold">
                    {`${user?.firstName ?? ''} ${user?.lastName ?? ''}`}
                  </Box>
                  <Box color="common.black75">{user?.email}</Box>
                </>
                )}
            />
          ))}
        </FormControl>
      </Paper>
    </Grid>
  );
}

import { Box, Checkbox, FormControlLabel, Grid, Paper, Typography } from '@material-ui/core';
import { QATags } from 'models/QA.model';
import { getFilterStatuses, getIdentityStatusLabel } from 'models/Status.model';
import React, { useCallback, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { ReactComponent as CheckboxOff } from '../../../../assets/icon-checkbox-off.svg';
import { ReactComponent as CheckboxOn } from '../../../../assets/icon-checkbox-on.svg';
import { useStyles } from './ByStatuses.styles';

export const ByStatuses = ({ bufferedFilter: { status }, onFilterChange }) => {
  const intl = useIntl();
  const [statuses] = useState(getFilterStatuses());
  const classes = useStyles();

  const handleStatusClick = useCallback((id, isChecked) => {
    let newStatuses = [...status];
    if (isChecked) {
      if (!newStatuses.includes(id)) {
        newStatuses.push(id);
      }
    } else {
      newStatuses = newStatuses.filter((item) => item !== id);
    }
    onFilterChange({ status: newStatuses });
  }, [status, onFilterChange]);

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="subtitle2">
        <Box display="flex" alignItems="center" pb={1}>
          <FiCheckCircle />
          <Box ml={0.6} component="span">{intl.formatMessage({ id: 'VerificationFilter.status.title' })}</Box>
        </Box>
      </Typography>
      <Paper className={classes.status} data-qa={QATags.Filter.byStatus}>
        {statuses.map((item) => (
          <FormControlLabel
            key={item.id}
            control={(
              <Checkbox
                checked={status.includes(item.id)}
                onChange={(event) => handleStatusClick(item.id, event.target.checked)}
                value={item.id}
                checkedIcon={<CheckboxOn />}
                icon={<CheckboxOff />}
                color="primary"
              />
            )}
            label={(
              <Typography className={classes[item.id]}>
                {intl.formatMessage({ id: getIdentityStatusLabel(item.id) })}
              </Typography>
            )}
          />
        ))}
      </Paper>
    </Grid>
  );
};

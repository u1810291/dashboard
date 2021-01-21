import { Box, Checkbox, FormControl, FormControlLabel, Grid, Paper, Typography } from '@material-ui/core';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import React, { useCallback } from 'react';
import { FiBox } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { ReactComponent as CheckboxOff } from '../../../../assets/icon-checkbox-off.svg';
import { ReactComponent as CheckboxOn } from '../../../../assets/icon-checkbox-on.svg';
import { useStyles } from './ByFlows.styles';
import { QATags } from '../../../../models/QA.model';

export const ByFlows = ({ bufferedFilter: { flowIds }, onHandleFilterChange }) => {
  const intl = useIntl();
  const classes = useStyles();
  const merchantFlowList = useSelector(selectMerchantFlowsModel);

  const handleSelectFlow = useCallback(({ target: { value } }) => {
    const newFlowIds = [...flowIds];

    if (flowIds.includes(value)) {
      const filtered = newFlowIds.filter((item) => item !== value);
      onHandleFilterChange({ flowIds: filtered });
      return;
    }

    newFlowIds.push(value);
    onHandleFilterChange({ flowIds: value === '' ? [] : newFlowIds });
  }, [flowIds, onHandleFilterChange]);

  const checkIsSelected = useCallback((id) => flowIds?.includes(id), [flowIds]);

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="subtitle2">
        <Box display="flex" alignItems="center" pb={1}>
          <FiBox />
          <Box ml={0.6} component="span">{intl.formatMessage({ id: 'VerificationFilter.flows.title' })}</Box>
        </Box>
      </Typography>
      <Paper className={classes.flowsList}>
        <FormControl data-qa={QATags.Filter.byFlow} variant="outlined" fullWidth>
          <FormControlLabel
            value=""
            checked={flowIds?.length === 0}
            control={<Checkbox onChange={handleSelectFlow} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />}
            label={intl.formatMessage({ id: 'VerificationFilter.flows.allFlows' })}
          />
          {!LoadableAdapter.isPristine(merchantFlowList) && merchantFlowList.value.map((item) => (
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
    </Grid>
  );
};

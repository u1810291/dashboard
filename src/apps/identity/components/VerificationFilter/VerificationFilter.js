import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import { FiFilter, FiX } from 'react-icons/fi';
import { getFilterStatuses, getIdentityStatusLabel } from 'models/Identity.model';
import { DEFAULT_FLOW } from '../../models/filter.model';
import { DateRange } from '../DateRange/DateRange';

export function VerificationFilter({ values, onChange }) {
  const intl = useIntl();
  const [statuses] = useState(getFilterStatuses());
  const merchantFlowList = useSelector(selectMerchantFlowsModel);

  const handleStatusClick = useCallback((id) => {
    let newStatuses = [...values.status];
    if (newStatuses.includes(id)) {
      newStatuses = newStatuses.filter((item) => item !== id);
    } else {
      newStatuses.push(id);
    }
    onChange({ status: newStatuses });
  }, [values, onChange]);

  const handleDateChange = useCallback(({ startDate, endDate }) => {
    onChange({
      'dateCreated[start]': startDate,
      'dateCreated[end]': endDate,
    });
  }, [onChange]);

  function handleSelectFlow({ target: { value } }) {
    const flowId = value === DEFAULT_FLOW ? '' : value;
    onChange({ flowId });
  }

  const handleClearAll = useCallback(() => {
    onChange({
      status: [],
      flowId: '',
      'dateCreated[start]': null,
      'dateCreated[end]': null,
    });
  }, [onChange]);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} direction="column">
          {/* header */}
          <Grid item>
            <Typography variant="h5">
              <Box display="flex" alignItems="center">
                <Icon color="primary" fontSize="small">
                  <FiFilter />
                </Icon>
                <Box ml={1} component="span">{intl.formatMessage({ id: 'VerificationFilter.title' })}</Box>
              </Box>
            </Typography>
          </Grid>

          {/* date range */}
          <Grid item>
            <Typography variant="h6" gutterBottom>{intl.formatMessage({ id: 'VerificationFilter.date.title' })}</Typography>
            <DateRange
              start={values['dateCreated[start]']}
              end={values['dateCreated[end]']}
              onChange={handleDateChange}
            />
          </Grid>

          {/* flow */}
          <Grid item>
            <Typography variant="h6" gutterBottom>{intl.formatMessage({ id: 'VerificationFilter.flows.title' })}</Typography>
            <FormControl variant="outlined" fullWidth>
              <Select onChange={handleSelectFlow} value={(values.flowId || DEFAULT_FLOW)}>
                <MenuItem value={DEFAULT_FLOW}>
                  <em>{intl.formatMessage({ id: 'VerificationFilter.flows.allFlows' })}</em>
                </MenuItem>
                {merchantFlowList.value.map((item) => (
                  <MenuItem key={item.id} color="primary" value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* status */}
          <Grid item>
            <Typography variant="h6" gutterBottom>{intl.formatMessage({ id: 'VerificationFilter.status.title' })}</Typography>
            {statuses.map((item) => (
              <FormControlLabel
                key={item.id}
                control={(
                  <Checkbox
                    checked={values.status.includes(item.id)}
                    onChange={() => handleStatusClick(item.id)}
                    value={item.id}
                    color="primary"
                  />
                )}
                label={intl.formatMessage({ id: getIdentityStatusLabel(item.id) })}
              />
            ))}
          </Grid>

          {/* clear all */}
          <Grid item>
            <Button
              variant="outlined"
              onClick={handleClearAll}
              startIcon={<FiX />}
            >
              {intl.formatMessage({ id: 'VerificationFilter.clear-all' })}
            </Button>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  );
}

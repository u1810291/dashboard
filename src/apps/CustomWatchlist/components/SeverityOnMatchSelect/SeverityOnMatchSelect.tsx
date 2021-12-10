import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import { Select, MenuItem } from '@material-ui/core';
import { CustomWatchlistSeverityOnMatchTypes, IFlowWatchlist } from 'models/CustomWatchlist.model';
import { FlowWatchlistUi } from '../../models/CustomWatchlist.models';
import { useStyles } from './SeverityOnMatchSelect.styles';

export const SeverityOnMatchSelect = ({ watchlist, onUpdate }: {
  watchlist: FlowWatchlistUi;
  onUpdate: (watchlist: IFlowWatchlist) => void;
}) => {
  const intl = useIntl();
  const classes = useStyles();

  const handleSeverityChange = useCallback((watchlistValue: FlowWatchlistUi) => (event: React.ChangeEvent<{ value: unknown; name?: string }>) => {
    onUpdate({ id: watchlistValue.id, severityOnMatch: event.target.value as CustomWatchlistSeverityOnMatchTypes });
  }, [onUpdate]);

  return (
    <Select
      id="action-select"
      name="action"
      variant="outlined"
      fullWidth
      defaultValue={CustomWatchlistSeverityOnMatchTypes.NoAction}
      value={watchlist.severityOnMatch}
      onChange={handleSeverityChange(watchlist)}
      className={classnames(classes.actionSelect, classes[watchlist.severityOnMatch], {
        [classes.placeholder]: watchlist.severityOnMatch === CustomWatchlistSeverityOnMatchTypes.NoAction,
      })}
    >
      <MenuItem value={CustomWatchlistSeverityOnMatchTypes.NoAction} className={classes.placeholder}>
        {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.placeholder' })}
      </MenuItem>
      <MenuItem value={CustomWatchlistSeverityOnMatchTypes.Critical}>
        {intl.formatMessage({ id: `CustomWatchlist.settings.modal.input.action.option.${CustomWatchlistSeverityOnMatchTypes.Critical}` })}
      </MenuItem>
      <MenuItem value={CustomWatchlistSeverityOnMatchTypes.Medium}>
        {intl.formatMessage({ id: `CustomWatchlist.settings.modal.input.action.option.${CustomWatchlistSeverityOnMatchTypes.Medium}` })}
      </MenuItem>
      <MenuItem value={CustomWatchlistSeverityOnMatchTypes.Low}>
        {intl.formatMessage({ id: `CustomWatchlist.settings.modal.input.action.option.${CustomWatchlistSeverityOnMatchTypes.Low}` })}
      </MenuItem>
    </Select>
  );
};

import React, { useCallback } from 'react';
import { useFormatMessage } from 'apps/intl';
import classnames from 'classnames';
import { Select, MenuItem } from '@material-ui/core';
import { CustomWatchlistSeverityOnMatchTypes, IFlowWatchlist } from 'models/CustomWatchlist.model';
import { FlowWatchlistUi } from '../../models/CustomWatchlist.model';
import { useStyles } from './SeverityOnMatchSelect.styles';

export const SeverityOnMatchSelect = ({ watchlist, onUpdate }: {
  watchlist: FlowWatchlistUi;
  onUpdate: (watchlist: IFlowWatchlist) => void;
}) => {
  const formatMessage = useFormatMessage();
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
      defaultValue={CustomWatchlistSeverityOnMatchTypes.Medium}
      value={watchlist.severityOnMatch}
      onChange={handleSeverityChange(watchlist)}
      className={classnames(classes.actionSelect, classes[watchlist.severityOnMatch], {
        [classes.placeholder]: watchlist.severityOnMatch === CustomWatchlistSeverityOnMatchTypes.NoAction,
      })}
    >
      <MenuItem value={CustomWatchlistSeverityOnMatchTypes.NoAction} className={classes.placeholder}>
        {formatMessage('CustomWatchlist.settings.modal.input.action.placeholder')}
      </MenuItem>
      <MenuItem value={CustomWatchlistSeverityOnMatchTypes.Critical}>
        {formatMessage(`CustomWatchlist.settings.modal.input.action.option.${CustomWatchlistSeverityOnMatchTypes.Critical}`)}
      </MenuItem>
      <MenuItem value={CustomWatchlistSeverityOnMatchTypes.Medium}>
        {formatMessage(`CustomWatchlist.settings.modal.input.action.option.${CustomWatchlistSeverityOnMatchTypes.Medium}`)}
      </MenuItem>
      <MenuItem value={CustomWatchlistSeverityOnMatchTypes.Low}>
        {formatMessage(`CustomWatchlist.settings.modal.input.action.option.${CustomWatchlistSeverityOnMatchTypes.Low}`)}
      </MenuItem>
    </Select>
  );
};

import React, { useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import { Select, MenuItem } from '@material-ui/core';
import { CustomWatchlistSeverityOnMatchTypes, FlowWatchlist, FlowWatchlistUi } from 'models/CustomWatchlist.model';
import { useStyles } from './SeverityOnMatchSelect.styles';

export const SeverityOnMatchSelect = ({ watchlist, onUpdate }: {
  watchlist: FlowWatchlistUi;
  onUpdate: (watchlist: FlowWatchlist) => void;
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const actionOptions = useMemo(() => ([
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.option.noAction' }),
      value: CustomWatchlistSeverityOnMatchTypes.NoAction,
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.option.rejected' }),
      value: CustomWatchlistSeverityOnMatchTypes.Critical,
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.option.reviewNeeded' }),
      value: CustomWatchlistSeverityOnMatchTypes.Medium,
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.option.notifyByWebhook' }),
      value: CustomWatchlistSeverityOnMatchTypes.Low,
    },
  ]), [intl]);

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
      {actionOptions.map((item) => {
        if (item.value === CustomWatchlistSeverityOnMatchTypes.NoAction) {
          return (
            <MenuItem
              key={CustomWatchlistSeverityOnMatchTypes.NoAction}
              value={item.value}
              className={classes.placeholder}
            >
              {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.placeholder' })}
            </MenuItem>
          );
        }
        return (
          <MenuItem
            key={`${item.value}-${item.label}`}
            value={item.value}
          >
            {item.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

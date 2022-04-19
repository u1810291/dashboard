import React, { useMemo } from 'react';
import { useFormatMessage } from 'apps/intl';
import { useSelector } from 'react-redux';
import { ButtonStyled } from 'apps/ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import { WatchlistProcessStatusTypes, IWatchlistValidationError } from 'models/Watchlist.model';
import { useStyles } from './BasicWatchlistModalValidationSubmitButton.styles';
import { selectCurrentBasicWatchlistError } from '../../state/Aml.selectors';

export function BasicWatchlistModalValidationSubmitButton({ loading, isWatchlistRunning, isEdit, disabled }: {
  isEdit: boolean;
  isWatchlistRunning: boolean;
  loading: boolean;
  disabled: boolean;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const currentWatchlistError = useSelector<any, IWatchlistValidationError[] | null>(selectCurrentBasicWatchlistError);
  const isCurrentWatchlistError = Array.isArray(currentWatchlistError) && currentWatchlistError?.length !== 0;

  const buttonText = useMemo<string | React.ReactNode>(() => {
    if (loading) {
      return (
        <>
          {isWatchlistRunning && <span className={classes.buttonRunning}>{formatMessage(`Watchlist.settings.modal.button.status.${WatchlistProcessStatusTypes.Running}`)}</span>}
          <CircularProgress color="inherit" size={17} />
        </>
      );
    }

    if (isEdit) {
      return formatMessage('Watchlist.settings.modal.button.update');
    }

    return formatMessage('Watchlist.settings.modal.button.create');
  }, [isWatchlistRunning, isEdit, classes, loading, formatMessage]);

  return (
    <ButtonStyled
      type="submit"
      variant="contained"
      color="primary"
      size="large"
      fullWidth
      disabled={disabled || isCurrentWatchlistError}
    >
      {buttonText}
    </ButtonStyled>
  );
}

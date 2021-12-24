import React, { useMemo } from 'react';
import { useFormatMessage } from 'apps/intl';
import { useSelector } from 'react-redux';
import { ButtonStyled } from 'apps/ui/components/ButtonStyled/ButtonStyled';
import CircularProgress from '@material-ui/core/CircularProgress';
import { WatchlistProcessStatus } from '../../models/CustomWatchlist.models';
import { selectCurrentCustomWatchlistStatus, selectCurrentCustomWatchlistId, selectCurrentCustomWatchlistError } from '../../state/CustomWatchlist.selectors';
import { useStyles } from './CustomWatchlistModalValidationSubmitButton.styles';

export function CustomWatchlistModalValidationSubmitButton({ isWatchlistsLoading, isWatchlistRunning, isFormSubmitting, isEdit, disabled }: {
  isEdit: boolean;
  isWatchlistsLoading: boolean;
  isWatchlistRunning: boolean;
  isFormSubmitting: boolean;
  disabled: boolean;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const currentWatchlistStatus = useSelector(selectCurrentCustomWatchlistStatus);
  const currentWatchlistError = useSelector(selectCurrentCustomWatchlistError);
  const isCurrentWatchlistError = Array.isArray(currentWatchlistError) && currentWatchlistError?.length !== 0;
  const hasSpinner = isWatchlistsLoading || isFormSubmitting || isWatchlistRunning;

  const buttonText = useMemo(() => {
    if (hasSpinner) {
      return (
        <>
          {isWatchlistRunning && <span className={classes.buttonRunning}>{formatMessage(`CustomWatchlist.settings.modal.button.status.${WatchlistProcessStatus.Running}`)}</span>}
          <CircularProgress color="inherit" size={17} />
        </>
      );
    }

    console.log({ isEdit, currentWatchlistStatus });
    if (isEdit) {
      return formatMessage('CustomWatchlist.settings.modal.button.update');
    }

    if (!isEdit) {
      return formatMessage('CustomWatchlist.settings.modal.button.create');
    }

    return formatMessage('CustomWatchlist.settings.modal.button.done');
  }, [isWatchlistRunning, isEdit, classes, hasSpinner, currentWatchlistStatus, formatMessage]);

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

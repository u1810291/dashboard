import React, { useMemo } from 'react';
import { useFormatMessage } from 'apps/intl';
import { useSelector } from 'react-redux';
import { ButtonStyled } from 'apps/ui/components/ButtonStyled/ButtonStyled';
import CircularProgress from '@material-ui/core/CircularProgress';
import { WatchlistProcessStatus } from '../../models/CustomWatchlist.models';
import { selectCurrentCustomWatchlist, selectCurrentCustomWatchlistError } from '../../state/CustomWatchlist.selectors';
import { useStyles } from './CustomWatchlistModalValidationSubmitButton.styles';

export function CustomWatchlistModalValidationSubmitButton({ isWatchlistsLoading, isWatchlistRunning, isFormSubmitting, disabled }: {
  isWatchlistsLoading: boolean;
  isWatchlistRunning: boolean;
  isFormSubmitting: boolean;
  disabled: boolean;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const currentWatchlist = useSelector(selectCurrentCustomWatchlist);
  const currentWatchlistError = useSelector(selectCurrentCustomWatchlistError);
  const isCurrentWatchlistError = Array.isArray(currentWatchlistError) && currentWatchlistError?.length !== 0;

  // console.log('currentWatchlist', currentWatchlist);
  // console.log({ currentWatchlistError, disabled, isCurrentWatchlistError });

  const buttonText = useMemo(() => {
    if (currentWatchlist?.process?.status === WatchlistProcessStatus.Completed) {
      return formatMessage('CustomWatchlist.settings.modal.button.done');
    }

    return formatMessage('CustomWatchlist.settings.modal.button.create');
  }, [currentWatchlist, formatMessage]);

  return (
    <ButtonStyled
      type="submit"
      variant="contained"
      color="primary"
      size="large"
      fullWidth
      disabled={disabled || isCurrentWatchlistError}
    >
      {isWatchlistsLoading || isFormSubmitting || isWatchlistRunning ? (
        <>
          {isWatchlistRunning && <span className={classes.buttonRunning}>{formatMessage(`CustomWatchlist.settings.modal.button.status.${WatchlistProcessStatus.Running}`)}</span>}
          <CircularProgress color="inherit" size={17} />
        </>
      ) : (
        <>
          {buttonText}
          {/* {(!currentWatchlist) && formatMessage('CustomWatchlist.settings.modal.button.create')}
          {currentWatchlist?.process?.status === WatchlistProcessStatus.Completed && formatMessage('CustomWatchlist.settings.modal.button.done')}
          {((currentWatchlist?.id && !currentWatchlist?.process)) && formatMessage('CustomWatchlist.settings.modal.button.validate')} */}
        </>
      )}
    </ButtonStyled>
  );
}

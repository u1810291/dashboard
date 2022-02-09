import React, { useMemo } from 'react';
import { useFormatMessage } from 'apps/intl';
import { useSelector } from 'react-redux';
import { ButtonStyled } from 'apps/ui/components/ButtonStyled/ButtonStyled';
import CircularProgress from '@material-ui/core/CircularProgress';
import { WatchlistProcessStatus } from '../../models/CustomWatchlist.models';
import { selectCurrentCustomWatchlistError } from '../../state/CustomWatchlist.selectors';
import { useStyles } from './CustomWatchlistModalValidationSubmitButton.styles';

export function CustomWatchlistModalValidationSubmitButton({ loading, isWatchlistRunning, isEdit, disabled }: {
  isEdit: boolean;
  isWatchlistRunning: boolean;
  loading: boolean;
  disabled: boolean;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const currentWatchlistError = useSelector(selectCurrentCustomWatchlistError);
  const isCurrentWatchlistError = Array.isArray(currentWatchlistError) && currentWatchlistError?.length !== 0;

  // TODO: @richvoronov remove this after backend fixies
  const tempoAlfaReleaseFix = isEdit ? false : isCurrentWatchlistError;

  const buttonText = useMemo(() => {
    if (loading) {
      return (
        <>
          {isWatchlistRunning && <span className={classes.buttonRunning}>{formatMessage(`CustomWatchlist.settings.modal.button.status.${WatchlistProcessStatus.Running}`)}</span>}
          <CircularProgress color="inherit" size={17} />
        </>
      );
    }

    if (isEdit) {
      return formatMessage('CustomWatchlist.settings.modal.button.update');
    }

    return formatMessage('CustomWatchlist.settings.modal.button.create');
  }, [isWatchlistRunning, isEdit, classes, loading, formatMessage]);

  return (
    <ButtonStyled
      type="submit"
      variant="contained"
      color="primary"
      size="large"
      fullWidth
      disabled={disabled || tempoAlfaReleaseFix}
    >
      {buttonText}
    </ButtonStyled>
  );
}

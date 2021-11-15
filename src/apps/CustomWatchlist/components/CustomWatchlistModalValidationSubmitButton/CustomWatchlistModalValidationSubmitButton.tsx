import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { ButtonStyled } from 'apps/ui/components/ButtonStyled/ButtonStyled';
import CircularProgress from '@material-ui/core/CircularProgress';
import { WatchlistProcessStatus } from 'models/CustomWatchlist.model';
import { selectCurrentCustomWatchlist } from '../../state/CustomWatchlist.selectors';
import { useStyles } from './CustomWatchlistModalValidationSubmitButton.styles';

export function CustomWatchlistModalValidationSubmitButton({ isWatchlistsLoading, isWatchlistRunning, isFormSubmitting }: {
  isWatchlistsLoading: boolean;
  isWatchlistRunning: boolean;
  isFormSubmitting: boolean;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const currentWatchlist = useSelector(selectCurrentCustomWatchlist);
  return (
    <ButtonStyled
      type="submit"
      variant="contained"
      color="primary"
      size="large"
      fullWidth
      disabled={isWatchlistsLoading || isWatchlistRunning}
    >
      {isWatchlistsLoading || isFormSubmitting || isWatchlistRunning ? (
        <>
          {isWatchlistRunning && <span className={classes.buttonRunning}>{intl.formatMessage({ id: `CustomWatchlist.settings.modal.button.status.${WatchlistProcessStatus.Running}` })}</span>}
          <CircularProgress color="inherit" size={17} />
        </>
      ) : (
        <>
          {currentWatchlist?.process.status === WatchlistProcessStatus.Completed && intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.done' })}
          {!currentWatchlist?.process && intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.validate' })}
        </>
      )}
    </ButtonStyled>
  );
}

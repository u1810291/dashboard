import React from 'react';
import { useSelector } from 'react-redux';
import { useFormatMessage } from 'apps/intl';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';
import { selectCurrentCustomWatchlistId } from '../../state/CustomWatchlist.selectors';
import { useStyles } from './CustomWatchlistModalValidation.styles';
import { CustomWatchlistModalValidationForm } from '../CustomWatchlistModalValidationForm/CustomWatchlistModalValidationForm';
import { CustomWatchlistModalValidationInputTypes, FlowWatchlistUi } from '../../models/CustomWatchlist.model';

export function CustomWatchlistModalValidation({ watchlist, onClose, onSubmit }: {
  watchlist?: FlowWatchlistUi;
  onClose: () => void;
  onSubmit: (values: CustomWatchlistModalValidationInputTypes, watchlist?: Partial<FlowWatchlistUi>) => void;
}) {
  const formatMessage = useFormatMessage();
  const currentWatchlistId = useSelector<any, number>(selectCurrentCustomWatchlistId);
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container justifyContent="space-between" alignItems="flex-start">
        <Box mb={4}>
          <Typography variant="h3" className={classes.modalTitle}>
            {formatMessage('Watchlist.settings.modal.title')}
          </Typography>
          {Boolean(currentWatchlistId) && (
          <Typography variant="subtitle2" className={classes.modalSubTitle}>
            {formatMessage('CustomWatchlist.settings.modal.subtitle')}
            &#58;
              {' '}
            {currentWatchlistId}
          </Typography>
          )}
        </Box>
        <div onClick={onClose} onKeyPress={onClose} role="button" tabIndex={0} className={classes.closeButton}>
          <Close />
        </div>
      </Grid>
      <CustomWatchlistModalValidationForm watchlist={watchlist} onClose={onClose} onSubmit={onSubmit} />
    </Box>
  );
}

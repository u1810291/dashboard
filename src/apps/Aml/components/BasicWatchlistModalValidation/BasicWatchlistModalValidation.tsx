import React from 'react';
import { useSelector } from 'react-redux';
import { useFormatMessage } from 'apps/intl';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';
import { IWatchlist } from 'models/Watchlist.model';
import { selectCurrentBasicWatchlistId } from '../../state/Aml.selectors';
import { IBasicWatchlistModalValidationInputs } from '../../models/Aml.model';
import { useStyles } from './BasicWatchlistModalValidation.styles';
import { BasicWatchlistModalValidationForm } from '../BasicWatchlistModalValidationForm/BasicWatchlistModalValidationForm';

export function BasicWatchlistModalValidation({ watchlist, onClose, onSubmit }: {
  onClose: () => void;
  onSubmit: (values: IBasicWatchlistModalValidationInputs, watchlist?: Partial<IWatchlist>) => void;
  watchlist?: IWatchlist;
}) {
  const formatMessage = useFormatMessage();
  const currentWatchlistId = useSelector<any, number>(selectCurrentBasicWatchlistId);
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
            {formatMessage('BasicWatchlist.settings.modal.subtitle')}
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
      <BasicWatchlistModalValidationForm watchlist={watchlist} onClose={onClose} onSubmit={onSubmit} />
    </Box>
  );
}

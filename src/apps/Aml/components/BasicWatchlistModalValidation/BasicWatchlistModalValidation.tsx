import React from 'react';
import { useFormatMessage } from 'apps/intl';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';
import { IWatchlist } from 'models/Watchlist.model';
import { IBasicWatchlistModalValidationInputs } from '../../models/Aml.model';
import { useStyles } from './BasicWatchlistModalValidation.styles';
import { BasicWatchlistModalValidationForm } from '../BasicWatchlistModalValidationForm/BasicWatchlistModalValidationForm';

export function BasicWatchlistModalValidation({ watchlist, onClose, onSubmit }: {
  onClose: () => void;
  onSubmit: (values: IBasicWatchlistModalValidationInputs, watchlist?: Partial<IWatchlist>) => void;
  watchlist?: IWatchlist;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container justifyContent="space-between" alignItems="flex-start">
        <Typography variant="h3" className={classes.modalTitle}>
          {formatMessage('CustomWatchlist.settings.modal.title')}
        </Typography>
        <div onClick={onClose} onKeyPress={onClose} role="button" tabIndex={0} className={classes.closeButton}>
          <Close />
        </div>
      </Grid>
      <BasicWatchlistModalValidationForm watchlist={watchlist} onClose={onClose} onSubmit={onSubmit} />
    </Box>
  );
}

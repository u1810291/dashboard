import React from 'react';
import { useFormatMessage } from 'apps/intl';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';
import { useStyles } from './CustomWatchlistModalValidation.styles';
import { CustomWatchlistModalValidationForm } from '../CustomWatchlistModalValidationForm/CustomWatchlistModalValidationForm';
import { CustomWatchlistModalValidationInputTypes, FlowWatchlistUi } from '../../models/CustomWatchlist.model';

export function CustomWatchlistModalValidation({ watchlist, onClose, onSubmit }: {
  watchlist?: FlowWatchlistUi;
  onClose: () => void;
  onSubmit: (values: CustomWatchlistModalValidationInputTypes, watchlist?: Partial<FlowWatchlistUi>) => void;
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
      <CustomWatchlistModalValidationForm watchlist={watchlist} onClose={onClose} onSubmit={onSubmit} />
    </Box>
  );
}

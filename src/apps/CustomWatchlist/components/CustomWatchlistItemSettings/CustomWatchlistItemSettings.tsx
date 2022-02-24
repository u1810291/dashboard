import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useOverlay } from 'apps/overlay';
import { useFormatMessage } from 'apps/intl';
import dayjs from 'dayjs';
import classnames from 'classnames';
import { IFlowWatchlist } from 'models/CustomWatchlist.model';
import React, { useCallback, useState } from 'react';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { DateFormat } from 'lib/date';
import { notification } from 'apps/ui';
import { CustomWatchlistModalValidation } from '../CustomWatchlistModalValidation/CustomWatchlistModalValidation';
import { SeverityOnMatchSelect } from '../SeverityOnMatchSelect/SeverityOnMatchSelect';
import { deleteCustomWatchlistById, customWatchlistCreate, customWatchlistUpdateById, updateMerchantWatchlistContent, setCurrentWatchlist, clearWatchlist } from '../../state/CustomWatchlist.actions';
import { selectCurrentCustomWatchlistIsLoading, selectIsWatchlistsFailed, selectIsWatchlistsLoaded } from '../../state/CustomWatchlist.selectors';
import { useStyles } from './CustomWatchlistItemSettings.styles';
import { CustomWatchlistsLoading } from '../CustomWatchlistsLoading/CustomWatchlistsLoading';
import { CustomWatchlistModalValidationInputs, CustomWatchlistModalValidationInputTypes, FlowWatchlistUi } from '../../models/CustomWatchlist.models';

export function CustomWatchlistItemSettings({ watchlists, onUpdate }: {
  watchlists: FlowWatchlistUi[];
  onUpdate: (watchlist: IFlowWatchlist) => void;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [createOverlay, closeOverlay] = useOverlay();
  const merchantId = useSelector(selectMerchantId);
  const isWatchlistsLoaded = useSelector(selectIsWatchlistsLoaded);
  const isWatchlistsFailed = useSelector(selectIsWatchlistsFailed);
  const isCurrentCustomWatchlistIsLoading = useSelector(selectCurrentCustomWatchlistIsLoading);
  const [watchlistDeletionId, setWatchlistDeletionId] = useState<number | null>(null);

  const handleCloseOverlay = useCallback(() => {
    dispatch(clearWatchlist());
    closeOverlay();
  }, [dispatch, closeOverlay]);

  const handleSubmitWatchlist = useCallback(async (values: CustomWatchlistModalValidationInputTypes, watchlist?: Partial<FlowWatchlistUi>) => {
    const watchlistRequestData = {
      [CustomWatchlistModalValidationInputs.Name]: values.name,
      [CustomWatchlistModalValidationInputs.Mapping]: values.mapping,
    };
    const watchlistContentValues = {
      [CustomWatchlistModalValidationInputs.FileKey]: values[CustomWatchlistModalValidationInputs.FileKey],
      [CustomWatchlistModalValidationInputs.FileName]: values[CustomWatchlistModalValidationInputs.FileName],
      [CustomWatchlistModalValidationInputs.CsvSeparator]: values[CustomWatchlistModalValidationInputs.CsvSeparator],
    };

    // edit flow
    if (watchlist?.id) {
      await dispatch(customWatchlistUpdateById(merchantId, watchlist.id, watchlistRequestData));
      await dispatch(updateMerchantWatchlistContent(merchantId, watchlist.id, watchlistContentValues));
      notification.info(formatMessage('CustomWatchlist.settings.watchlist.updated', { messageValues: { name: watchlist.name } }));
      return;
    }

    // create flow
    dispatch(customWatchlistCreate(merchantId, watchlistRequestData, async (watchlistData) => {
      dispatch(setCurrentWatchlist(watchlistData.id));
      notification.info(formatMessage('CustomWatchlist.settings.watchlist.created', { messageValues: { name: watchlistData.name } }));
      await dispatch(updateMerchantWatchlistContent(merchantId, watchlistData.id, watchlistContentValues));
    }));
  }, [merchantId, formatMessage, dispatch]);

  const handleOpenWatchlist = useCallback((watchlist?: FlowWatchlistUi) => () => {
    dispatch(clearWatchlist());
    if (watchlist?.id) {
      dispatch(setCurrentWatchlist(watchlist.id));
    }
    createOverlay(
      <CustomWatchlistModalValidation
        watchlist={watchlist}
        onClose={handleCloseOverlay}
        onSubmit={handleSubmitWatchlist}
      />,
      { onClose: handleCloseOverlay },
    );
  }, [dispatch, createOverlay, handleCloseOverlay, handleSubmitWatchlist]);

  const handleDeleteWatchList = useCallback((watchlist: FlowWatchlistUi) => async () => {
    setWatchlistDeletionId(watchlist.id);
    await dispatch(deleteCustomWatchlistById(merchantId, watchlist.id, (error) => {
      setWatchlistDeletionId(null);
      const details = error.response?.data?.details ?? {};
      notification.error(formatMessage(`CustomWatchlist.settings.watchlist.deleted.${details.code}`, {
        messageValues: {
          name: watchlist.name,
          ending: details?.flows.length > 1 ? 's' : '',
          flows: details?.flows?.filter((_, i) => i < 3).join(', '),
        },
      }));
    }));
    setWatchlistDeletionId(null);
  }, [merchantId, dispatch, formatMessage]);

  return (
    <Box>
      {(!isWatchlistsLoaded && !isWatchlistsFailed) ? <CustomWatchlistsLoading /> : (
        <>
          {watchlists?.map((watchlist) => (
            <Box key={watchlist.id} className={classes.wrapper} p={2} mb={2}>
              <Box mb={2}>
                <Grid container wrap="nowrap" alignItems="center">
                  <Box color="common.black90" fontWeight="bold" mr={1}>
                    {watchlist.name}
                  </Box>
                  <Box ml="auto" flexShrink={0}>
                    <IconButton disabled={watchlistDeletionId === watchlist.id} className={classnames(classes.button, classes.buttonEdit)} onClick={handleOpenWatchlist(watchlist)}>
                      <FiEdit size={17} />
                    </IconButton>
                    <IconButton disabled={watchlistDeletionId === watchlist.id} className={classnames(classes.button, classes.buttonTrash)} onClick={handleDeleteWatchList(watchlist)}>
                      <FiTrash2 size={17} />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid container>
                  {watchlist.createdAt && !watchlist.process?.error ? (
                    <Typography variant="subtitle2" className={classes.colorGreen}>
                      {formatMessage('CustomWatchlist.settings.watchlist.uploaded')}
                      {' '}
                      {dayjs(watchlist.createdAt).format(DateFormat.FullMonthDateAndFullYear)}
                    </Typography>
                  ) : (
                    <Typography variant="subtitle2" className={classes.colorRed}>{formatMessage('CustomWatchlist.settings.watchlist.validation.error')}</Typography>
                  )}
                </Grid>
                <Box mt={2}>
                  <SeverityOnMatchSelect watchlist={watchlist} onUpdate={onUpdate} />
                </Box>
              </Box>
            </Box>
          ))}
          <Button className={classes.buttonAdd} onClick={handleOpenWatchlist()} color="primary" variant="outlined" disabled={isCurrentCustomWatchlistIsLoading}>
            <FiPlus size={12} />
            {formatMessage('CustomWatchlist.settings.button')}
          </Button>
        </>
      )}
    </Box>
  );
}

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
import { selectIsWatchlistsFailed, selectIsWatchlistsLoaded } from '../../state/CustomWatchlist.selectors';
import { useStyles } from './CustomWatchlistItemSettings.styles';
import { CustomWatchlistsLoading } from '../CustomWatchlistsLoading/CustomWatchlistsLoading';
import { CustomWatchlistModalValidationInputs, CustomWatchlistModalValidationInputTypes, FlowWatchlistUi, WatchlistContentTypes } from '../../models/CustomWatchlist.models';

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
  const [watchlistDeletionId, setWatchlistDeletionId] = useState<number | null>(null);

  const handleCloseOverlay = useCallback(() => {
    closeOverlay();
    dispatch(clearWatchlist());
  }, [dispatch, closeOverlay]);

  const customWatchlistsContentUpdate = useCallback(async (watchlistId: number, values: WatchlistContentTypes, isCreateFlow?: boolean) => {
    await dispatch(updateMerchantWatchlistContent(merchantId, watchlistId, values, isCreateFlow));
  }, [merchantId, dispatch]);

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

    if (watchlist?.id) {
      await dispatch(customWatchlistUpdateById(merchantId, watchlist.id, watchlistRequestData));
      await customWatchlistsContentUpdate(watchlist.id, watchlistContentValues, true);
      notification.info(formatMessage('CustomWatchlist.settings.watchlist.updated', { messageValues: { name: watchlist.name } }));
      return;
    }
    dispatch(customWatchlistCreate(merchantId, watchlistRequestData, async (watchlistData) => {
      await customWatchlistsContentUpdate(watchlistData.id, watchlistContentValues, true);
      notification.info(formatMessage('CustomWatchlist.settings.watchlist.created', { messageValues: { name: watchlistData.name } }));
    }));
  }, [merchantId, formatMessage, customWatchlistsContentUpdate, dispatch]);

  const handleOpenWatchlist = useCallback((watchlist?: FlowWatchlistUi) => () => {
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
          <Button className={classes.buttonAdd} onClick={handleOpenWatchlist()} color="primary" variant="outlined">
            <FiPlus size={12} />
            {formatMessage('CustomWatchlist.settings.button')}
          </Button>
        </>
      )}
    </Box>
  );
}

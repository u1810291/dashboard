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
import { CustomWatchlistModalValidation, CustomWatchlistModalValidationInputTypes } from '../CustomWatchlistModalValidation/CustomWatchlistModalValidation';
import { SeverityOnMatchSelect } from '../SeverityOnMatchSelect/SeverityOnMatchSelect';
import { deleteCustomWatchlistById, customWatchlistCreate, customWatchlistUpdateById, updateMerchantWatchlistContent, customWatchlistLoadById, setCurrentWatchlist, clearCurrentWatchlist, clearCurrentWatchlistHeaders } from '../../state/CustomWatchlist.actions';
import { selectIsWatchlistsFailed, selectIsWatchlistsLoaded } from '../../state/CustomWatchlist.selectors';
import { useStyles } from './CustomWatchlistItemSettings.styles';
import { CustomWatchlistsLoading } from '../CustomWatchlistsLoading/CustomWatchlistsLoading';
import { CustomWatchlistModalValidationInputs, FlowWatchlistUi, WatchlistContentTypes } from '../../models/CustomWatchlist.models';

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
    dispatch(clearCurrentWatchlist());
    dispatch(clearCurrentWatchlistHeaders());
  }, [dispatch, closeOverlay]);

  const customWatchlistsContentUpdate = useCallback((watchlistId: number, values: WatchlistContentTypes) => {
    dispatch(updateMerchantWatchlistContent(merchantId, watchlistId, values));
  }, [merchantId, dispatch]);

  const handleSubmitWatchlist = useCallback((watchlist?: IFlowWatchlist) => (values: CustomWatchlistModalValidationInputTypes) => {
    const watchlistRequestData = {
      name: values.name,
      mapping: values.mapping,
    };
    const watchlistContentValues = {
      [CustomWatchlistModalValidationInputs.FileKey]: values[CustomWatchlistModalValidationInputs.FileKey],
      [CustomWatchlistModalValidationInputs.FileName]: values[CustomWatchlistModalValidationInputs.FileName],
      [CustomWatchlistModalValidationInputs.CsvSeparator]: values[CustomWatchlistModalValidationInputs.CsvSeparator],
    };

    if (watchlist) {
      dispatch(customWatchlistUpdateById(merchantId, watchlist.id, watchlistRequestData, handleCloseOverlay));
      customWatchlistsContentUpdate(watchlist.id, watchlistContentValues);
      return;
    }
    dispatch(customWatchlistCreate(merchantId, watchlistRequestData, async (watchlistData) => {
      await customWatchlistsContentUpdate(watchlistData.id, watchlistContentValues);
      dispatch(setCurrentWatchlist(watchlistData.id));
    }));
  }, [merchantId, customWatchlistsContentUpdate, handleCloseOverlay, dispatch]);

  const handleOpenWatchlist = useCallback((watchlist?: FlowWatchlistUi) => () => {
    if (watchlist?.id) {
      dispatch(setCurrentWatchlist(watchlist.id));
    }
    createOverlay(
      <CustomWatchlistModalValidation
        watchlist={watchlist}
        onClose={handleCloseOverlay}
        onSubmit={handleSubmitWatchlist(watchlist)}
      />,
      { onClose: handleCloseOverlay },
    );
  }, [dispatch, createOverlay, handleCloseOverlay, handleSubmitWatchlist]);

  const handleDeleteWatchList = useCallback((watchlistId: number) => async () => {
    setWatchlistDeletionId(watchlistId);
    await dispatch(deleteCustomWatchlistById(merchantId, watchlistId, (error) => {
      setWatchlistDeletionId(null);
      notification.error(error.response?.data?.message);
    }));
    setWatchlistDeletionId(null);
  }, [merchantId, dispatch]);

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
                    <IconButton disabled={watchlistDeletionId === watchlist.id} className={classnames(classes.button, classes.buttonTrash)} onClick={handleDeleteWatchList(watchlist.id)}>
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

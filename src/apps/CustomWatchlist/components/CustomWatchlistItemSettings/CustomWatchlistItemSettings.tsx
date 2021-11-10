import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useOverlay } from 'apps/overlay';
import dayjs from 'dayjs';
import classnames from 'classnames';
import { useLongPolling } from 'lib/longPolling.hook';
import { FlowWatchlist, FlowWatchlistUi, WatchlistContentTypes } from 'models/CustomWatchlist.model';
import React, { useCallback, useState } from 'react';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { DateFormat } from 'lib/date';
import { CustomWatchlistModalValidation, CustomWatchlistModalValidationInputTypes } from '../CustomWatchlistModalValidation/CustomWatchlistModalValidation';
import { SeverityOnMatchSelect } from '../SeverityOnMatchSelect/SeverityOnMatchSelect';
import { deleteCustomWatchlistById, customWatchlistCreate, customWatchlistUpdateById, updateMerchantWatchlistContent, customWatchlistLoadById } from '../../state/CustomWatchlist.actions';
import { selectIsWatchlistsLoaded } from '../../state/CustomWatchlist.selectors';
import { useStyles } from './CustomWatchlistItemSettings.styles';
import { CustomWatchlistsLoading } from '../CustomWatchlistsLoading/CustomWatchlistsLoading';

export function CustomWatchlistItemSettings({ watchlists, onUpdate }: {
  watchlists: FlowWatchlistUi[];
  onUpdate: (watchlist: FlowWatchlist) => void;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [createOverlay, closeOverlay] = useOverlay();
  const merchantId = useSelector(selectMerchantId);
  const isWatchlistsLoaded = useSelector(selectIsWatchlistsLoaded);
  const [isDataPooling, setIsDataPooling] = useState(false);
  const [selectedWatchlist, setSelectedWatchlist] = useState<FlowWatchlist | null>(null);

  const handleWatchlistLoad = useCallback((isReload: boolean) => {
    // TODO: @richvoronov will use it on STAGE 2 of this feature
    // console.log('isReload', isReload, selectedWatchlist);
  }, [selectedWatchlist]);

  useLongPolling(handleWatchlistLoad, 3000, {
    isCheckMerchantTag: false,
    isUseFirstInvoke: false,
    isDone: !isDataPooling,
  });

  const handleCloseOverlay = useCallback(() => {
    setSelectedWatchlist(null);
    setIsDataPooling(false);
    closeOverlay();
  }, [closeOverlay]);

  const customWatchlistsContentUpdate = useCallback((watchlistId: number, values: WatchlistContentTypes) => {
    dispatch(updateMerchantWatchlistContent(merchantId, watchlistId, values));
  }, [merchantId, dispatch]);

  const handleSubmitWatchlist = useCallback((watchlist?: FlowWatchlist) => (values: CustomWatchlistModalValidationInputTypes) => {
    setIsDataPooling(true);
    const watchlistRequestData = {
      name: values.name,
      mapping: values.mapping,
    };
    // TODO: @richvoronov STAGE 2, separate values on 2 requests, to /content, and other

    if (watchlist) {
      dispatch(customWatchlistUpdateById(merchantId, watchlist.id, watchlistRequestData, handleCloseOverlay));
      customWatchlistsContentUpdate(watchlist.id, {
        // TODO: @richvoronov STAGE 2, remove mock
        fileUrl: 'https://file.liga.net/images/general/2020/09/08/20200908171549-5386.jpg?v=1599578314',
        fileName: values.fileName,
        csvSeparator: values.csvSeparator,
      });
      return;
    }
    dispatch(customWatchlistCreate(merchantId, watchlistRequestData, (watchlistData) => {
      handleCloseOverlay();
      customWatchlistsContentUpdate(watchlistData.id, {
        // TODO: @richvoronov STAGE 2, remove mock
        fileUrl: 'https://file.liga.net/images/general/2020/09/08/20200908171549-5386.jpg?v=1599578314',
        fileName: values.fileName,
        csvSeparator: values.csvSeparator,
      });
    }));
  }, [merchantId, customWatchlistsContentUpdate, handleCloseOverlay, dispatch]);

  const handleOpenWatchlist = useCallback((watchlist?: FlowWatchlistUi) => () => {
    dispatch(customWatchlistLoadById(merchantId, watchlist.id));
    setSelectedWatchlist(watchlist);
    createOverlay(
      <CustomWatchlistModalValidation
        watchlist={watchlist}
        onClose={handleCloseOverlay}
        onSubmit={handleSubmitWatchlist(watchlist)}
      />,
      { onClose: handleCloseOverlay },
    );
  }, [createOverlay, handleCloseOverlay, handleSubmitWatchlist, dispatch]);

  const handleDeleteWatchList = useCallback((watchlistId: number) => () => {
    dispatch(deleteCustomWatchlistById(merchantId, watchlistId));
  }, [merchantId, dispatch]);

  return (
    <Box>
      {!isWatchlistsLoaded ? <CustomWatchlistsLoading /> : (
        <>
          {watchlists?.map((watchlist) => (
            <Box key={watchlist.id} className={classes.wrapper} p={2} mb={2}>
              <Box mb={2}>
                <Grid container wrap="nowrap" alignItems="center">
                  <Box color="common.black90" fontWeight="bold" mr={1}>
                    {watchlist.name}
                  </Box>
                  <Box ml="auto" flexShrink={0}>
                    <IconButton className={classnames(classes.button, classes.buttonEdit)} onClick={handleOpenWatchlist(watchlist)}>
                      <FiEdit size={17} />
                    </IconButton>
                    <IconButton className={classnames(classes.button, classes.buttonTrash)} onClick={handleDeleteWatchList(watchlist.id)}>
                      <FiTrash2 size={17} />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid container>
                  {/* TODO: @richvoronov STAGE 2, logic should be (watchlist.createdAt && ... no validation error ...) */}
                  {watchlist.createdAt ? (
                    <Typography variant="subtitle2" className={classes.colorGreen}>
                      {intl.formatMessage({ id: 'CustomWatchlist.settings.watchlist.uploaded' })}
                      {' '}
                      {dayjs(watchlist.createdAt).format(DateFormat.FullMonthDateAndFullYear)}
                    </Typography>
                  ) : (
                    <Typography variant="subtitle2" className={classes.colorRed}>{intl.formatMessage({ id: 'CustomWatchlist.settings.watchlist.validationError' })}</Typography>
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
            {intl.formatMessage({ id: 'CustomWatchlist.settings.button' })}
          </Button>
        </>
      )}
    </Box>
  );
}

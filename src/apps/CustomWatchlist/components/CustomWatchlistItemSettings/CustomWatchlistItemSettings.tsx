import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useOverlay } from 'apps/overlay';
import moment from 'moment';
import classNames from 'classnames';
import { useLongPolling } from 'lib/longPolling.hook';
import { Watchlist } from 'models/CustomWatchlist.model';
import { customWatchlistClear, customWatchlistsLoad, deleteCustomWatchlist, customWatchlistCreate, customWatchlistUpdate } from 'apps/CustomWatchlist/state/CustomWatchlist.actions';
import { selectIsWatchlistsLoaded, selectWatchlists } from 'apps/CustomWatchlist/state/CustomWatchlist.selectors';
import React, { useEffect, useCallback, useState } from 'react';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { CustomWatchListModal } from '../CustomWatchListModal/CustomWatchListModal';
import { useStyles } from './CustomWatchlistItemSettings.styles';
import { Skeleton } from './CustomWatchlistItemSkeleton';

export function CustomWatchlistItemSettings() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [createOverlay, closeOverlay] = useOverlay();
  const merchantId = useSelector(selectMerchantId);
  const watchlists = useSelector(selectWatchlists);
  const isWatchlistsLoaded = useSelector(selectIsWatchlistsLoaded);
  const [isDataPooling, setIsDataPooling] = useState(false);
  const [selectedWatchlist, setSelectedWatchlist] = useState<Watchlist | undefined>();

  console.log({ isDataPooling, selectedWatchlist });

  const handleWatchlistLoad = useCallback(
    (isReload: boolean) => {
      console.log('isReload', isReload, selectedWatchlist);
    },
    [selectedWatchlist],
  );

  useLongPolling(handleWatchlistLoad, 3000, {
    isCheckMerchantTag: false,
    isUseFirstInvoke: false,
    isDone: !isDataPooling,
  });

  const handleCloseOverlay = useCallback(
    () => {
      setSelectedWatchlist(undefined);
      setIsDataPooling(false);
      closeOverlay();
    },
    [closeOverlay],
  );

  const handleSubmitWatchlist = useCallback(
    // TODO: add types for values
    (watchlist?: Watchlist) => (values: Object) => {
      console.log('submit', { watchlist, values });
      setIsDataPooling(true);
      if (watchlist) {
        dispatch(customWatchlistUpdate(merchantId, watchlist.id, values));
        return;
      }
      dispatch(customWatchlistCreate(merchantId, values));
    },
    [merchantId, dispatch],
  );

  const handleChangeStep = useCallback((watchlist?: Watchlist) => () => {
    setSelectedWatchlist(watchlist);
    createOverlay(
      <CustomWatchListModal
        isEdit={!!watchlist}
        onClose={handleCloseOverlay}
        onSubmit={handleSubmitWatchlist(watchlist)}
      />, { onClose: handleCloseOverlay },
    );
  }, [createOverlay, handleCloseOverlay, handleSubmitWatchlist]);

  const handleDeleteWatchList = useCallback(
    (watchlistId: string) => () => {
      dispatch(deleteCustomWatchlist(merchantId, watchlistId));
    },
    [merchantId, dispatch],
  );

  // const handleDeleteStep = useCallback((watchlistIndex: number) => () => {
  //   const newSettings = cloneDeep(watchlist);
  //   if (!watchlist) {
  //     return;
  //   }

  //   newSettings.splice(watchlistIndex, 1);
  //   onUpdate(newSettings);
  // }, [onUpdate, watchlist]);

  useEffect(() => {
    dispatch(customWatchlistsLoad(merchantId));
    return () => {
      dispatch(customWatchlistClear());
    };
  }, [merchantId, dispatch]);

  return (
    <Box>
      {!isWatchlistsLoaded ? (
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Skeleton />
          </Grid>
          <Grid item>
            <Skeleton />
          </Grid>
          <Grid item>
            <Skeleton />
          </Grid>
        </Grid>
      ) : (
        <>
          {watchlists?.map((watchlist, watchlistIndex) => (
            <Box key={watchlist.id} className={classes.wrapper} p={2} mb={2}>
              <Box mb={2}>
                <Grid container wrap="nowrap" alignItems="center">
                  <Box color="common.black90" fontWeight="bold" mr={1}>
                    {intl.formatMessage({ id: 'CustomWatchlist.settings.step.title' }, { count: watchlistIndex !== 0 ? watchlistIndex + 1 : '' })}
                  </Box>
                  <Box ml="auto" flexShrink={0}>
                    <IconButton className={classNames(classes.button, classes.buttonEdit)} onClick={handleChangeStep(watchlist)}>
                      <FiEdit size={17} />
                    </IconButton>
                    <IconButton className={classNames(classes.button, classes.buttonTrash)} onClick={handleDeleteWatchList(watchlist.id)}>
                      <FiTrash2 size={17} />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid container>
                  {/* TODO: watchlist.createdAt && ... no validation error ... */}
                  {watchlist.createdAt ? (
                    <Typography variant="subtitle2" className={classes.colorGreen}>
                      Uploaded
                      {' '}
                      {moment(watchlist.createdAt).format('ll')}
                    </Typography>
                  ) : (
                    <Typography variant="subtitle2" className={classes.colorRed}>Validation error</Typography>
                  )}
                </Grid>
                <Box mt={2}>
                  <Typography variant="subtitle2" className={classNames(classes.colorGrey, classes.matchFollowsTo)}>
                    Match follows to:
                    <Box className={classes.colorRed} ml={0.5}>Rejected</Box>
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
          <Button className={classes.buttonAdd} onClick={handleChangeStep()} color="primary" variant="outlined">
            <FiPlus size={12} />
            {intl.formatMessage({ id: 'CustomWatchlist.settings.button' })}
          </Button>
        </>
      )}
    </Box>
  );
}

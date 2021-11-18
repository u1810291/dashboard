import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useOverlay } from 'apps/overlay';
import dayjs from 'dayjs';
import classnames from 'classnames';
import { useLongPolling } from 'lib/longPolling.hook';
import { FlowWatchlist, FlowWatchlistUi } from 'models/CustomWatchlist.model';
import React, { useCallback, useState } from 'react';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { SkeletonThreeRectTwoCircle } from 'apps/ui/components/SkeletonGroups';
import { CustomWatchListModalValidation, CustomWatchlistModalValidationInputTypes } from '../CustomWatchListModalValidation/CustomWatchListModalValidation';
import { SeverityOnMatchSelect } from '../SeverityOnMatchSelect/SeverityOnMatchSelect';
import { deleteCustomWatchlist, customWatchlistCreate, customWatchlistUpdate } from '../../state/CustomWatchlist.actions';
import { selectIsWatchlistsLoaded } from '../../state/CustomWatchlist.selectors';
import { useStyles } from './CustomWatchlistItemSettings.styles';

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

  const handleSubmitWatchlist = useCallback((watchlist?: FlowWatchlist) => (values: CustomWatchlistModalValidationInputTypes) => {
    setIsDataPooling(true);
    if (watchlist) {
      dispatch(customWatchlistUpdate(merchantId, watchlist.id, values, handleCloseOverlay));
      return;
    }
    dispatch(customWatchlistCreate(merchantId, values, handleCloseOverlay));
  }, [merchantId, handleCloseOverlay, dispatch]);

  const handleChangeStep = useCallback((watchlist?: FlowWatchlistUi) => () => {
    setSelectedWatchlist(watchlist);
    createOverlay(
      <CustomWatchListModalValidation
        watchlist={watchlist}
        onClose={handleCloseOverlay}
        onSubmit={handleSubmitWatchlist(watchlist)}
      />,
      { onClose: handleCloseOverlay },
    );
  }, [createOverlay, handleCloseOverlay, handleSubmitWatchlist]);

  const handleDeleteWatchList = useCallback((watchlistId: number) => () => {
    dispatch(deleteCustomWatchlist(merchantId, watchlistId));
  }, [merchantId, dispatch]);

  return (
    <Box>
      {!isWatchlistsLoaded ? (
        <Grid container spacing={2} direction="column">
          <Grid item>
            <SkeletonThreeRectTwoCircle />
          </Grid>
          <Grid item>
            <SkeletonThreeRectTwoCircle />
          </Grid>
          <Grid item>
            <SkeletonThreeRectTwoCircle />
          </Grid>
        </Grid>
      ) : (
        <>
          {watchlists?.map((watchlist, watchlistIndex) => (
            <Box key={watchlist.id} className={classes.wrapper} p={2} mb={2}>
              <Box mb={2}>
                <Grid container wrap="nowrap" alignItems="center">
                  <Box color="common.black90" fontWeight="bold" mr={1}>
                    {/* TODO: @richvoronov STAGE 2, Do we need this if the name field is required?  */}
                    {watchlist.name || intl.formatMessage({ id: 'CustomWatchlist.settings.step.title' }, { count: watchlistIndex + 1 })}
                  </Box>
                  <Box ml="auto" flexShrink={0}>
                    <IconButton className={classnames(classes.button, classes.buttonEdit)} onClick={handleChangeStep(watchlist)}>
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
                      {dayjs(watchlist.createdAt).format('ll')}
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
          <Button className={classes.buttonAdd} onClick={handleChangeStep()} color="primary" variant="outlined">
            <FiPlus size={12} />
            {intl.formatMessage({ id: 'CustomWatchlist.settings.button' })}
          </Button>
        </>
      )}
    </Box>
  );
}

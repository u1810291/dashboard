import { Box, Button, Grid, IconButton, Typography, Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useOverlay } from 'apps/overlay';
import moment from 'moment';
import classNames from 'classnames';
import { useLongPolling } from 'lib/longPolling.hook';
import { CustomWatchlistSeverityOnMatch, CustomWatchlistModalSubmitType, FlowWatchlist } from 'models/CustomWatchlist.model';
import { customWatchlistClear, customWatchlistsLoad, deleteCustomWatchlist, customWatchlistCreate, customWatchlistUpdate } from 'apps/CustomWatchlist/state/CustomWatchlist.actions';
import { selectIsWatchlistsLoaded } from 'apps/CustomWatchlist/state/CustomWatchlist.selectors';
import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { CustomWatchListModal } from '../CustomWatchListModal/CustomWatchListModal';
import { useStyles } from './CustomWatchlistItemSettings.styles';
import { Skeleton } from './CustomWatchlistItemSkeleton';

export function CustomWatchlistItemSettings({ watchlists, onUpdate }: { watchlists: FlowWatchlist[]; onUpdate: (watchlist: FlowWatchlist) => void }) {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [createOverlay, closeOverlay] = useOverlay();
  const merchantId = useSelector(selectMerchantId);
  const isWatchlistsLoaded = useSelector(selectIsWatchlistsLoaded);
  const [isDataPooling, setIsDataPooling] = useState(false);
  const [selectedWatchlist, setSelectedWatchlist] = useState<FlowWatchlist>();

  const handleWatchlistLoad = useCallback(
    (isReload: boolean) => {
      console.log('isReload', isReload, selectedWatchlist);
    }, [selectedWatchlist],
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
    }, [closeOverlay],
  );

  const handleSubmitWatchlist = useCallback(
    (watchlist?: FlowWatchlist) => (values: CustomWatchlistModalSubmitType) => {
      setIsDataPooling(true);
      if (watchlist) {
        dispatch(customWatchlistUpdate(merchantId, watchlist.watchlistId, values, handleCloseOverlay));
        return;
      }
      dispatch(customWatchlistCreate(merchantId, values, handleCloseOverlay));
    }, [merchantId, handleCloseOverlay, dispatch],
  );

  const handleChangeStep = useCallback((watchlist?: FlowWatchlist) => () => {
    setSelectedWatchlist(watchlist);
    createOverlay(
      <CustomWatchListModal
        watchlist={watchlist}
        onClose={handleCloseOverlay}
        onSubmit={handleSubmitWatchlist(watchlist)}
      />, { onClose: handleCloseOverlay },
    );
  }, [createOverlay, handleCloseOverlay, handleSubmitWatchlist]);

  const handleDeleteWatchList = useCallback(
    (watchlistId: number) => () => {
      dispatch(deleteCustomWatchlist(merchantId, watchlistId));
    }, [merchantId, dispatch],
  );

  const handleSeverityChange = useCallback(
    (watchlist: FlowWatchlist) => (event: React.ChangeEvent<{ value: unknown; name?: string }>) => {
      onUpdate({ ...watchlist, severityOnMatch: event.target.value as CustomWatchlistSeverityOnMatch });
    }, [onUpdate],
  );

  useEffect(() => {
    dispatch(customWatchlistsLoad(merchantId));
    return () => {
      dispatch(customWatchlistClear());
    };
  }, [merchantId, dispatch]);

  const actionOptions = useMemo(() => ([
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.option.noAction' }),
      value: CustomWatchlistSeverityOnMatch.NoAction,
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.option.rejected' }),
      value: CustomWatchlistSeverityOnMatch.Critical,
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.option.reviewNeeded' }),
      value: CustomWatchlistSeverityOnMatch.Medium,
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.option.notifyByWebhook' }),
      value: CustomWatchlistSeverityOnMatch.Low,
    },
  ]), [intl]);

  console.log({ watchlists });

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
            <Box key={watchlist.watchlistId} className={classes.wrapper} p={2} mb={2}>
              <Box mb={2}>
                <Grid container wrap="nowrap" alignItems="center">
                  <Box color="common.black90" fontWeight="bold" mr={1}>
                    {watchlist.name || intl.formatMessage({ id: 'CustomWatchlist.settings.step.title' }, { count: watchlistIndex + 1 })}
                  </Box>
                  <Box ml="auto" flexShrink={0}>
                    <IconButton className={classNames(classes.button, classes.buttonEdit)} onClick={handleChangeStep(watchlist)}>
                      <FiEdit size={17} />
                    </IconButton>
                    <IconButton className={classNames(classes.button, classes.buttonTrash)} onClick={handleDeleteWatchList(watchlist.watchlistId)}>
                      <FiTrash2 size={17} />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid container>
                  {/* TODO: @richvoronov logic should be (watchlist.createdAt && ... no validation error ...) */}
                  {watchlist.createdAt ? (
                    <Typography variant="subtitle2" className={classes.colorGreen}>
                      {intl.formatMessage({ id: 'CustomWatchlist.settings.watchlist.uploaded' })}
                      {' '}
                      {moment(watchlist.createdAt).format('ll')}
                    </Typography>
                  ) : (
                    <Typography variant="subtitle2" className={classes.colorRed}>{intl.formatMessage({ id: 'CustomWatchlist.settings.watchlist.validationError' })}</Typography>
                  )}
                </Grid>
                <Box mt={2}>
                  <Select
                    id="action-select"
                    name="action"
                    variant="outlined"
                    fullWidth
                    defaultValue={CustomWatchlistSeverityOnMatch.NoAction}
                    value={watchlist.severityOnMatch}
                    onChange={handleSeverityChange(watchlist)}
                    className={classNames(classes.actionSelect, {
                      [classes.placeholder]: watchlist.severityOnMatch === CustomWatchlistSeverityOnMatch.NoAction,
                      [classes.colorGreen]: watchlist.severityOnMatch === CustomWatchlistSeverityOnMatch.Low,
                      [classes.colorOrange]: watchlist.severityOnMatch === CustomWatchlistSeverityOnMatch.Medium,
                      [classes.colorRed]: watchlist.severityOnMatch === CustomWatchlistSeverityOnMatch.Critical,
                    })}
                  >
                    {actionOptions.map((item) => {
                      if (item.value === CustomWatchlistSeverityOnMatch.NoAction) {
                        return (
                          <MenuItem
                            key={CustomWatchlistSeverityOnMatch.NoAction}
                            value={item.value}
                            className={classes.placeholder}
                          >
                            {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.placeholder' })}
                          </MenuItem>
                        );
                      }
                      return (
                        <MenuItem
                          key={`${item.value}-${item.label}`}
                          value={item.value}
                        >
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
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

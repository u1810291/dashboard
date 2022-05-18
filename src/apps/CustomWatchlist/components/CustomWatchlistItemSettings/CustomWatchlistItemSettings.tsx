import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useOverlay } from 'apps/overlay';
import { useFormatMessage } from 'apps/intl';
import dayjs from 'dayjs';
import classnames from 'classnames';
import React, { useCallback, useState } from 'react';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { DateFormat } from 'lib/date';
import { notification, Warning, WarningTypes } from 'apps/ui';
import { CustomWatchlistSeverityOnMatchTypes } from 'models/CustomWatchlist.model';
import { IWatchlist } from 'models/Watchlist.model';
import { CustomWatchlistModalValidation } from '../CustomWatchlistModalValidation/CustomWatchlistModalValidation';
import { SeverityOnMatchSelect } from '../SeverityOnMatchSelect/SeverityOnMatchSelect';
import { deleteCustomWatchlistById, setCurrentWatchlist, clearWatchlist, customWatchlistsFlowSubmit } from '../../state/CustomWatchlist.actions';
import { selectCanUseCustomWatchlists, selectCurrentCustomWatchlistIsLoading, selectIsWatchlistsFailed, selectIsWatchlistsLoaded } from '../../state/CustomWatchlist.selectors';
import { useStyles } from './CustomWatchlistItemSettings.styles';
import { CustomWatchlistsLoading } from '../CustomWatchlistsLoading/CustomWatchlistsLoading';
import { CustomWatchlistModalValidationInputTypes, FlowWatchlistUi, MAX_CUSTOMWATCHLISTS_QTY } from '../../models/CustomWatchlist.model';

export function CustomWatchlistItemSettings({ watchlists, onUpdate }: {
  watchlists: FlowWatchlistUi[];
  onUpdate: (watchlist: Partial<FlowWatchlistUi>) => void;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [createOverlay, closeOverlay] = useOverlay();
  const canUseCustomWatchlists = useSelector(selectCanUseCustomWatchlists);
  const merchantId = useSelector(selectMerchantId);
  const isWatchlistsLoaded = useSelector(selectIsWatchlistsLoaded);
  const isWatchlistsFailed = useSelector(selectIsWatchlistsFailed);
  const isCurrentCustomWatchlistIsLoading = useSelector(selectCurrentCustomWatchlistIsLoading);
  const [watchlistDeletionId, setWatchlistDeletionId] = useState<Nullable<number>>(null);
  const isMaxCustomWatchlistsQty = watchlists.length >= MAX_CUSTOMWATCHLISTS_QTY;

  const handleCloseOverlay = useCallback(() => {
    dispatch(clearWatchlist());
    closeOverlay();
  }, [dispatch, closeOverlay]);

  const handleSubmitWatchlist = useCallback(async (values: CustomWatchlistModalValidationInputTypes, watchlist?: Partial<FlowWatchlistUi>) => {
    const handleWatchlistCallback = (watchlistData: Partial<IWatchlist>) => {
      if (watchlist?.id) {
        notification.info(formatMessage('Watchlist.settings.watchlist.updated', { messageValues: { name: watchlist.name } }));
        return;
      }

      onUpdate({ id: watchlistData.id, severityOnMatch: CustomWatchlistSeverityOnMatchTypes.Medium });
      notification.info(formatMessage('Watchlist.settings.watchlist.created', { messageValues: { name: watchlistData.name } }));
    };

    dispatch(customWatchlistsFlowSubmit(merchantId, values, handleWatchlistCallback, watchlist));
  }, [merchantId, formatMessage, onUpdate, dispatch]);

  const handleOpenWatchlist = useCallback((watchlist?: FlowWatchlistUi) => () => {
    if (!canUseCustomWatchlists) {
      return;
    }

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
  }, [dispatch, createOverlay, handleCloseOverlay, handleSubmitWatchlist, canUseCustomWatchlists]);

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
      {canUseCustomWatchlists && (!isWatchlistsLoaded && !isWatchlistsFailed) ? <CustomWatchlistsLoading /> : (
        <>
          {canUseCustomWatchlists && watchlists?.map((watchlist) => (
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
          {isMaxCustomWatchlistsQty && (
            <Box mb={1} className={classes.warningWrap}>
              <Warning
                type={WarningTypes.Notify}
                label={formatMessage('CustomWatchlist.settings.list.qtywarning', { messageValues: { count: MAX_CUSTOMWATCHLISTS_QTY } })}
                isIconExist={false}
              />
            </Box>
          )}
          <Button className={classes.buttonAdd} onClick={handleOpenWatchlist()} color="primary" variant="outlined" disabled={isCurrentCustomWatchlistIsLoading || isMaxCustomWatchlistsQty}>
            <FiPlus size={12} />
            {formatMessage('CustomWatchlist.settings.button')}
          </Button>
        </>
      )}
    </Box>
  );
}

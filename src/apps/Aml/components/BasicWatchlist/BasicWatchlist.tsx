import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { FiPlus } from 'react-icons/fi';
import { ButtonStyled, notification } from 'apps/ui';
import Typography from '@material-ui/core/Typography';
import { useFormatMessage } from 'apps/intl';
import { useOverlay } from 'apps/overlay';
import { BasicWatchlistIdType } from 'models/Aml.model';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { IWatchlist, WatchlistIdType } from 'models/Watchlist.model';
import { useDebounce } from 'lib/debounce.hook';
import { selectCanManageBasicWatchlists } from 'apps/Aml/state/Aml.selectors';
import { getTogglePrimitiveInArray } from 'lib/array';
import { basicWatchlistsFlowSubmit, clearWatchlist, setCurrentWatchlist, basicWatchlistLoadById } from '../../state/Aml.actions';
import { AmlBasicWatchlistList } from '../BasicWatchlistList/BasicWatchlistList';
import { IAmlBasicWatchlistGroupUI, IBasicWatchlistModalValidationInputs, IBasicWatchlistItemUI } from '../../models/Aml.model';
import { useBasicWatchlistData } from '../hooks/useBasicWatchlistData';
import { BasicWatchlistModalValidation } from '../BasicWatchlistModalValidation/BasicWatchlistModalValidation';
import { BasicWatchlistSkeleton } from '../BasicWatchlistSkeleton/BasicWatchlistSkeleton';

export function BasicWatchlist({ basicWatchlistsIds, onBasicWatchlistsSelected }: {
  basicWatchlistsIds: BasicWatchlistIdType[];
  onBasicWatchlistsSelected: (data: number[]) => void;
}) {
  const dispatch = useDispatch();
  const formatMessage = useFormatMessage();
  const debounce = useDebounce();
  const [createOverlay, closeOverlay] = useOverlay();
  const merchantId = useSelector<any, string>(selectMerchantId);
  const [watchlistChecked, setWatchlistChecked] = useState<BasicWatchlistIdType[]>(basicWatchlistsIds);
  const canManageBasicWatchlists = useSelector<any, boolean>(selectCanManageBasicWatchlists);

  const { basicWatchlistData, setBasicWatchlistData, addGroup, removeGroup, handleEdit, isGroupsLoading, isWatchlistLoading, runningWatchlists } = useBasicWatchlistData(basicWatchlistsIds, canManageBasicWatchlists);

  const handleGroupItemSwitch = useCallback((group: IAmlBasicWatchlistGroupUI, watchlistId: BasicWatchlistIdType, value: boolean) => {
    setWatchlistChecked((prev) => getTogglePrimitiveInArray<BasicWatchlistIdType>(prev, watchlistId));
    setBasicWatchlistData('checked', value, group, watchlistId);
  }, [setBasicWatchlistData]);

  const handleSubmitWatchlist = useCallback(async (values: IBasicWatchlistModalValidationInputs, watchlist?: Partial<IWatchlist>) => {
    const handleWatchlistCallback = (watchlistData: Partial<IWatchlist>) => {
      if (watchlist?.id) {
        notification.info(formatMessage('Watchlist.settings.watchlist.updated', { messageValues: { name: watchlist.name } }));
        return;
      }

      notification.info(formatMessage('Watchlist.settings.watchlist.created', { messageValues: { name: watchlistData.name } }));
    };

    dispatch(basicWatchlistsFlowSubmit(merchantId, values, handleWatchlistCallback, watchlist));
  }, [merchantId, formatMessage, dispatch]);

  const handleCloseOverlay = useCallback(() => {
    dispatch(clearWatchlist());
    closeOverlay();
  }, [dispatch, closeOverlay]);

  const handleRefreshClick = useCallback((watchlistId: WatchlistIdType) => () => {
    debounce(() => dispatch(basicWatchlistLoadById(merchantId, watchlistId)));
  }, [dispatch, debounce, merchantId]);

  const handleOpenWatchlist = useCallback((watchlist?: IBasicWatchlistItemUI) => () => {
    dispatch(clearWatchlist());
    if (watchlist?.id) {
      dispatch(setCurrentWatchlist(watchlist.id));
    }

    createOverlay(
      <BasicWatchlistModalValidation
        watchlist={watchlist}
        onClose={handleCloseOverlay}
        onSubmit={handleSubmitWatchlist}
      />,
      { onClose: handleCloseOverlay },
    );
  }, [dispatch, createOverlay, handleCloseOverlay, handleSubmitWatchlist]);

  useEffect(() => {
    if (basicWatchlistsIds.length !== watchlistChecked.length) {
      onBasicWatchlistsSelected(watchlistChecked);
    }
  }, [basicWatchlistsIds, watchlistChecked, onBasicWatchlistsSelected]);

  return (
    <>
      <Typography variant="subtitle2" color="textPrimary" gutterBottom>
        {formatMessage('BasicWatchlist.settings.title')}
      </Typography>
      <Box color="common.black75" mb={2}>
        {formatMessage('BasicWatchlist.settings.description')}
      </Box>
      {(isWatchlistLoading || isGroupsLoading) ? (
        <BasicWatchlistSkeleton />
      ) : (
        <AmlBasicWatchlistList
          data={basicWatchlistData}
          handleGroupItemSwitch={handleGroupItemSwitch}
          isAdmin={canManageBasicWatchlists}
          handleEditClick={handleEdit}
          handleRemoveClick={removeGroup}
          handleOpenWatchlist={handleOpenWatchlist}
          disabled={isWatchlistLoading || isGroupsLoading}
          runningWatchlists={runningWatchlists}
          handleRefreshClick={handleRefreshClick}
        />
      )}
      {canManageBasicWatchlists && (
        <>
          <ButtonStyled color="primary" disabled={isWatchlistLoading || isGroupsLoading}>
            <Typography variant="body1" onClick={addGroup}>{formatMessage('BasicWatchlist.settings.addGroup')}</Typography>
          </ButtonStyled>
          <Box mt={1}>
            <ButtonStyled
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
              onClick={handleOpenWatchlist()}
            >
              <FiPlus />
              {formatMessage('BasicWatchlist.settings.addWatchlist')}
            </ButtonStyled>
          </Box>
        </>
      )}
    </>
  );
}

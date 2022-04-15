import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { BasicWatchlistIdType } from 'models/Aml.model';
import { notification } from 'apps/ui';
import { useFormatMessage } from 'apps/intl';
import { Loadable } from 'models/Loadable.model';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { IWatchlist, IWatchlistGroup, WatchlistProcessStatusTypes, WatchlistIdType } from 'models/Watchlist.model';
import { IAmlBasicWatchlistGroupUI, getBasicWatchlistsUI } from '../../models/Aml.model';
import { selectWatchlists, selectWatchlistsModel, selectWatchlistsGroups, selectWatchlistsGroupsModel } from '../../state/Aml.selectors';
import { basicWatchlistsGroupCreate, basicWatchlistsGroupDelete, basicWatchlistsGroupUpdate, basicWatchlistsGroupItemDelete, basicWatchlistsGroupsClear, basicWatchlistsGroupsLoad, basicWatchlistsLoad } from '../../state/Aml.actions';

export function useBasicWatchlistData(basicWatchlistsIds: BasicWatchlistIdType[], isAdmin: boolean): {
  basicWatchlistData: IAmlBasicWatchlistGroupUI[];
  isGroupsLoading: boolean;
  isWatchlistLoading: boolean;
  setBasicWatchlistData: (key: string, value: unknown, group: IAmlBasicWatchlistGroupUI, watchlistId?: BasicWatchlistIdType) => void;
  addGroup: () => void;
  removeGroup: (group: IAmlBasicWatchlistGroupUI, groupItemId?: number) => (event: React.MouseEvent<HTMLElement>) => void;
  handleEdit: (group: IAmlBasicWatchlistGroupUI, watchlistId?: BasicWatchlistIdType) => (value: string, isNewGroup?: boolean, callback?: (loading: boolean, error?: unknown) => void) => void;
  runningWatchlists: WatchlistIdType[];
} {
  const dispatch = useDispatch();
  const formatMessage = useFormatMessage();
  const watchlists = useSelector<any, IWatchlist[]>(selectWatchlists);
  const watchlistsGroups = useSelector<any, IWatchlistGroup[]>(selectWatchlistsGroups);
  const merchantId = useSelector<any, string>(selectMerchantId);
  const { isLoading: watchlistIsLoading } = useSelector<any, Loadable<IWatchlist[]>>(selectWatchlistsModel);
  const { isLoading: watchlistsGroupsIsLoading } = useSelector<any, Loadable<IWatchlistGroup[]>>(selectWatchlistsGroupsModel);

  const [chanegableAmlBasicWatchlistData, setChangableAmlBasicWatchlistData] = useState<IAmlBasicWatchlistGroupUI[]>(getBasicWatchlistsUI(watchlists, watchlistsGroups, basicWatchlistsIds));
  const runningWatchlists = useMemo<WatchlistIdType[]>(() => watchlists.filter((watchlist) => watchlist?.process?.status && watchlist.process.status !== WatchlistProcessStatusTypes.Completed).map((watchlist) => watchlist.id), [watchlists]);

  const changableAmlBasicWatchlistDataUpdate = useCallback((key: string, value: unknown, group: IAmlBasicWatchlistGroupUI, watchlistId: number) => {
    setChangableAmlBasicWatchlistData((prev) => {
      const newState = cloneDeep(prev);
      const currentGroupIndex = newState.findIndex((item) => group.id === item.id);

      if (watchlistId) {
        const currentGroupItemIndex = group.watchlists.findIndex((item) => item.id === watchlistId);

        newState[currentGroupIndex].watchlists[currentGroupItemIndex][key] = value;
      } else {
        newState[currentGroupIndex][key] = value;
      }

      return newState;
    });
  }, []);

  const addGroup = useCallback(() => setChangableAmlBasicWatchlistData((prevState) => [...prevState, { id: prevState?.map((group) => group.id).reduce((a, b) => a + b, 1), name: '', watchlists: [] }]), []);

  const removeGroup = useCallback((group: IAmlBasicWatchlistGroupUI, groupItemId?: number) => (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    if (!group.name) {
      setChangableAmlBasicWatchlistData((prev) => prev.filter((currentGroup) => currentGroup.id !== group.id));
      return;
    }

    const handleIsDeleted = (isDeleted: boolean) => {
      if (isDeleted) {
        notification.success(formatMessage('BasicWatchlist.settings.notification.delete.success.text'));
        return;
      }
      notification.error(formatMessage('BasicWatchlist.settings.notification.delete.fail.text'));
    };

    if (groupItemId) {
      dispatch(basicWatchlistsGroupItemDelete(merchantId, groupItemId, handleIsDeleted));
      return;
    }
    dispatch(basicWatchlistsGroupDelete(group.id, handleIsDeleted));
  }, [merchantId, formatMessage, dispatch]);

  const handleEdit = useCallback((group: IAmlBasicWatchlistGroupUI) => (value: string, isNewGroup?: boolean, callback?: (loading: boolean, error?: unknown) => void) => {
    if (isNewGroup) {
      dispatch(basicWatchlistsGroupCreate({ name: value }, callback));
      return;
    }

    dispatch(basicWatchlistsGroupUpdate(group.id, { name: value }, callback));
  }, [dispatch]);

  useEffect(() => {
    dispatch(basicWatchlistsLoad());
    dispatch(basicWatchlistsGroupsLoad());
    return () => {
      dispatch(basicWatchlistsGroupsClear());
    };
  }, [merchantId, dispatch]);

  useEffect(() => {
    setChangableAmlBasicWatchlistData(getBasicWatchlistsUI(watchlists, watchlistsGroups, basicWatchlistsIds));
  }, [watchlists, watchlistsGroups, basicWatchlistsIds, isAdmin]);

  return {
    basicWatchlistData: chanegableAmlBasicWatchlistData,
    isGroupsLoading: watchlistsGroupsIsLoading,
    isWatchlistLoading: watchlistIsLoading,
    setBasicWatchlistData: changableAmlBasicWatchlistDataUpdate,
    addGroup,
    removeGroup,
    handleEdit,
    runningWatchlists,
  };
}

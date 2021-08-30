import { Loadable } from 'models/Loadable.model';
import { createTypesSequence, TypesSequence } from 'state/store.utils';

export const CUSTOM_WATCHLISTS_STORE_KEY = 'customWatchlists';

export enum CustomWatchlistsActions {
  list = 'CUSTOM_WATCHLISTS_LIST',
}

export enum SliceNames {
  List = 'list',
}

export const types: TypesSequence = {
  ...createTypesSequence(CustomWatchlistsActions.list),
};

export interface CustomWatchlistsStore {
  // TODO: @richvoronov add types
  [CustomWatchlistsActions.list]: Loadable<{}>;
}

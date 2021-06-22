import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { ReviewModeActionGroups, SliceNames, types } from './reviewMode.store';

const initialState = {
  [SliceNames.ReviewVerification]: LoadableAdapter.createState(null),
  [SliceNames.AwaitingCount]: LoadableAdapter.createState(0),
  [SliceNames.IsLoadingNext]: false,
};

export const reviewModeReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(ReviewModeActionGroups.ReviewVerification, SliceNames.ReviewVerification),
  ...LoadableAdapter.createHandlers(ReviewModeActionGroups.ReviewAwaitingCount, SliceNames.AwaitingCount),
  [types.REVIEW_LOADING_NEXT](state, { payload }) {
    return {
      ...state,
      isLoadingNext: payload,
    };
  },
});

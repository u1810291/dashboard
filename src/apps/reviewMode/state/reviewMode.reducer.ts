import { LoadableAdapter } from 'lib/Loadable.adapter';
import { createReducer } from 'state/store.utils';
import { ReviewModeActionGroups, ReviewModeSliceTypes, ReviewModeActionTypes, ReviewModeStore } from './reviewMode.store';

const initialState: ReviewModeStore = {
  [ReviewModeSliceTypes.ProductList]: [],
  [ReviewModeSliceTypes.ReviewVerification]: LoadableAdapter.createState(null),
  [ReviewModeSliceTypes.AwaitingCount]: LoadableAdapter.createState(0),
  [ReviewModeSliceTypes.IsLoadingNext]: false,
};

export const reviewModeReducer = createReducer(initialState, {
  ...LoadableAdapter.createHandlers(ReviewModeActionGroups.ReviewVerification, ReviewModeSliceTypes.ReviewVerification),
  ...LoadableAdapter.createHandlers(ReviewModeActionGroups.ReviewAwaitingCount, ReviewModeSliceTypes.AwaitingCount),
  [ReviewModeActionTypes.REVIEW_LOADING_NEXT](state, { payload }) {
    return {
      ...state,
      [ReviewModeSliceTypes.IsLoadingNext]: payload,
    };
  },
  [ReviewModeActionTypes.VERIFICATION_PRODUCT_LIST_UPDATE](state: ReviewModeStore, { payload }) {
    return {
      ...state,
      [ReviewModeSliceTypes.ProductList]: payload,
    };
  },
});

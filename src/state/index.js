import { applyMiddleware, combineReducers, createStore } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ReduxThunk from 'redux-thunk';
import * as reducers from 'state/reducers';

const persistConfig = {
  key: 'mgi-dashboard-4',
  whitelist: ['auth', 'webhooks', 'countries'],
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers),
);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

export const persistor = persistStore(store);

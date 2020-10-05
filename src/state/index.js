import { selectAuthToken } from 'apps/auth/state/auth.selectors';
import { AUTH_STORE_KEY } from 'apps/auth/state/auth.store';
import { USER_STORE_KEY } from 'apps/user/state/user.store';
import { http } from 'lib/client/http';
import { applyMiddleware, createStore } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ReduxThunk from 'redux-thunk';
import { rootReducers } from 'state/reducers';

const persistedReducer = persistReducer({
  key: 'mgi-dashboard-4',
  whitelist: [
    AUTH_STORE_KEY,
    USER_STORE_KEY,
  ],
  storage,
}, rootReducers);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

export const persistor = persistStore(store, null, () => {
  // invoked after store rehydrate
  const token = selectAuthToken(store.getState());
  http.setToken(token);
});

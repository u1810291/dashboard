import { AUTH_STORE_KEY } from 'apps/auth/state/auth.model';
import { selectAuthToken } from 'apps/auth/state/auth.selectors';
import { http } from 'lib/client/http';
import { applyMiddleware, createStore } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ReduxThunk from 'redux-thunk';
import { COUNTRIES_STORE_KEY } from 'state/countries/countries.model';
import { rootReducers } from 'state/reducers';
import { WEBHOOKS_STORE_KEY } from 'state/webhooks/webhooks.model';

const persistedReducer = persistReducer({
  key: 'mgi-dashboard-4',
  whitelist: [
    AUTH_STORE_KEY,
    WEBHOOKS_STORE_KEY,
    COUNTRIES_STORE_KEY,
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

import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import * as reducers from 'src/state/reducers'

const persistConfig = {
  key: 'mgi-dashboard-3',
  whitelist: ['auth', 'webhooks', 'merchant', 'countries'],
  storage
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers)
)

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
)

let persistor = persistStore(store)

export default function({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
<<<<<<< HEAD
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

import * as reducers from 'src/state/reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers)
)

const store = createStore(
  persistedReducer,
  applyMiddleware(ReduxThunk)
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
=======
import * as reducers from 'src/state/reducers'

const reducer = combineReducers(reducers)
const store = createStore(reducer, applyMiddleware(ReduxThunk))

export default function({ children }) {
  return <Provider store={store}>{children}</Provider>
>>>>>>> 177bac9d4003547904d96548d23d691f35e2b71e
}

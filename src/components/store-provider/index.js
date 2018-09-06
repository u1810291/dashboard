import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import * as reducers from 'src/state/reducers'

const reducer = combineReducers(reducers)
const store = createStore(reducer, applyMiddleware(ReduxThunk))

export default function({ children }) {
  return <Provider store={store}>{children}</Provider>
}

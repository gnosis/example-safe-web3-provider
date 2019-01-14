import { createStore, combineReducers } from 'redux'

import provider from '~/logic/provider/store/reducer/provider'

const reducers = combineReducers({
  provider
})

const rootReducer = (state, action) => {
  return reducers(state, action)
}

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

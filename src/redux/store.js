import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { auth } from './auth'
import { profile } from './profile'
import { users } from './users'

const reducers = combineReducers({
  auth,
  profile,
  users
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
export default store

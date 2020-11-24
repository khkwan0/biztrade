import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import ListingsReducer from './ListingsReducer'

export default combineReducers({
  userData: UserReducer,
  listingsData: ListingsReducer
})
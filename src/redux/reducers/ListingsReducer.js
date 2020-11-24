import * as TYPES from "../actions/types";

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.SET_LISTINGS:
      return [...action.payload]
    case TYPES.APPEND_LISTING: 
      return [...state].push(action.payload)
    default:
      return state
  }
}
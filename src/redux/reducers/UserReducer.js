import * as TYPES from "../actions/types";

const INITIAL_STATE = {
  user: {
    _id: null,
    email: null,
    verified_email: false,
    messages: [],
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.SET_USER:
      return {
        ...state,
        user: {...state.user, ...action.payload}
      }
    case TYPES.INSERT_MESSAGE: {
      const _messages = [...state.user.messages]
      _messages.unshift(action.payload)
      return {
        ...state,
        user: {...state.user, messages: [..._messages]}
      }
    }
    case TYPES.REMOVE_MESSAGE: {
      const _messages = [...state.user.messages]
      let i = 0; let found = false
      while (i < _messages.length && !found) {
        if (_messages[i]._id === action.payload) {
          found = true
        } else {
          i++
        }
      }
      if (found) {
        _messages.splice(i,1)
      }
      return {
        ...state,
        user: {...state.user, messages: [..._messages]}
      }
    }
    case TYPES.MARK_MESSAGE_READ: {
      let i = 0; let found = false;
      const _messages = [...state.user.messages]
      while (i < _messages.length && !found) {
        if (_messages[i]._id !== undefined && _messages[i]._id === action.payload) {
          found = true
        } else {
          i++
        }
      }
      if (found) {
        _messages[i].is_read = true
      }
      return {
        ...state,
        user: {...state.user, messages: [..._messages]}
      }
    }
    case TYPES.GET_MESSAGES: {
      return {
        ...state,
        user: {
          ...state.user,
          messages: action.payload,
        }
      }
    }
    case TYPES.SET_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload
        }
      }
    default:
      return state
  }
}
import * as TYPES from "./types"
import Utility from "../../library/Utility"

export const MarkMessageRead = (message_id, uid) => {
  return async dispatch => {
    try {
      const res = await Utility.PostToServer('/message/' + uid + '/' + message_id, {is_read:true})
    } catch(e) {
      console.log(e)
    }
    dispatch({
      type: TYPES.MARK_MESSAGE_READ,
      payload: message_id
    })
  }
}

export const InsertMessage = (message) => {
  return dispatch => {
    dispatch({
      type: TYPES.INSERT_MESSAGE,
      payload: message
    })
  }
}

export const RemoveMessage = (message_id) => {
  return dispatch => {
    dispatch({
      type: TYPES.REMOVE_MESSAGE,
      payload: message_id
    })
  }
}

export const GetMessages = (userId) => {
  return async dispatch => {
    try {
      const res = await Utility.GetFromServer('/messages/' + userId)
      console.log(res)
      if (res.err === 0) {
        const messages = res.msg
        dispatch({
          type: TYPES.GET_MESSAGES,
          payload: messages
        })
      }
    } catch(e) {
      throw new Error(e)
    }
  }
}
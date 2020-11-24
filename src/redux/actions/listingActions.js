import * as TYPES from "./types"
import Utility from '../../library/Utility'

export const GetListings = () => {
  return async dispatch => {
    try {
      const res = await Utility.GET("{listings}")
      if (res !== undefined && res.data !== undefined) {
        dispatch({
          type: TYPES.SET_LISTINGS,
          payload: res.data.listings
        })
      }
    } catch {
      throw new Error(e)
    }
  }
}
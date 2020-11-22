import * as TYPES from "./types";
import Utility from "../../util/Utility";

////////////////////////////////////////////////////// Exported function ///////////////////////////////////////////////////////////////////////
export const handlePostSaveCompanyEmail = (company_email, company_domain) => {
  return {
    type: TYPES.SET_COMPANY_EMAIL_AND_DOMAIN,
    payload: {
      company_email,
      company_domain
    }
  };
};

export const handleVerifiedCompanyEmail = () => {
  return {
    type: TYPES.SET_VERIFIED_COMPANY_EMAIL,
    payload: true
  };
};

export const postLocation = (location_id, user_id) => {
  return async dispatch => {
    try {
      console.log("postlocation", location_id, user_id);
      if (location_id) {
        await saveLocationId(location_id, user_id);
        dispatch({
          type: TYPES.SET_LOCATION_ID,
          payload: location_id
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const handleChangePhone = phone => {
  return {
    type: TYPES.SET_PHONE,
    payload: phone
  };
};

export const savePhone = async (phone, email) => {
  try {
    if (typeof phone !== "undefined" && phone) {
      let res = await Utility.PostToServer("/user/phone", { email, phone })
      return res;
    } else {
      throw new Error("Phone invalid!");
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const setNumCards = num_cards => {
  return {
    type: TYPES.SET_NUM_CARDS,
    payload: num_cards
  };
};

////////////////////////////////////////////////////// Non-export function ///////////////////////////////////////////////////////////////////////
saveLocationId = async (location_id, user_id) => {
  await Utility.PostToServer("/user/location", { uid: user_id, location_id: location_id })
}
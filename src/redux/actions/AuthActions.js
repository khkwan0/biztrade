import * as TYPES from "./types"
import config from "../../assets/configs/config"
import Utility from "../../library/Utility"

import AsyncStorage from '@react-native-async-storage/async-storage'

let userData = null

export const startLoginProcess = () => {
  return async dispatch => {
    console.log('startloginprocess')
    console.log(config.app.version())
    try {
      // Check if signed in before
      let user = null
      try {
        const res = await Utility.GET('{user(queryby: "email", val:"khkwan0") {name}}')
      } catch(e) {
        console.log(e)
        throw new Error(e)
      }
      if (user) {
        userData = user
        setUpPush()
        if (user.location_id === undefined) { user.location_id = null }
        dispatch({
          type: TYPES.SET_USER,
          payload: user
        })
        dispatch({
          type: TYPES.SET_LOGGEDIN_STATE,
          payload: true
        })
      } else {
        dispatch({
          type: TYPES.SET_LOGGEDIN_STATE,
          payload: false
        })
      }
    } catch (err) {
      console.log("Start login process catch", err.message)
      throw new Error(err)
    }
  }
}

export const setLoggedIn = (user) => {
  return async dispatch => {
    userData = user
    setUpPush()
    await SetJWTToken(user.token)
    delete(user.token)
    dispatch({
      type: TYPES.SET_USER,
      payload: user
    })
    dispatch({
      type: TYPES.SET_LOGGEDIN_STATE,
      payload: true
    })
  }
}

export const logout = (callback) => {
  return async dispatch => {
    try {
      await AsyncStorage.clear();
      dispatch({
        type: TYPES.SET_LOGGEDIN_STATE,
        payload: null
      });
      dispatch({
        type: TYPES.SET_USER,
        payload: {
          _id: null,
          email: '',
          messages:[]
        }
      });
      if (callback) {
        callback()
      }
    } catch (err) {
      console.log("Logout err", err);
      throw new Error(err);
    }
  };
};

export const setUpPush = () => {
  try {
    OneSignal.init(config.push.onesignal.appid)
    OneSignal.addEventListener("ids", onIds)
//    OneSignal.configure(); // this triggers method: async onIds(device)
  } catch (e) {
    throw new Error(e);
  }
};

/*
export const setToken = async (email) => {
  let token = Utility.GenerateToken()
  await AsyncStorage.setItem(config.storage.key_prefix + "local_token", token);
  await Utility.PostToServer("/token", { token: token, email: email, })
}
*/

export const facebookLogin = async token => {
  try {
    let json = await Utility.PostToServer(
      "https://graph.facebook.com/v3.1/me?fields=email,name&access_token=" +
        token
    );
    return json;
  } catch (e) {
    throw new Error(e);
  }
};

////////////////////////////////////////////////////// Non-export function ///////////////////////////////////////////////////////////////////////

GetJWTToken = async () => {
  try {
    const _token = await AsyncStorage.getItem(config.storage.key_prefix + "jwt")
    return (_token === undefined)?null:_token
  } catch(e) {
    return null
  }
}

SetJWTToken = async (token) => {
  await AsyncStorage.setItem(config.storage.key_prefix + "jwt", token)
}
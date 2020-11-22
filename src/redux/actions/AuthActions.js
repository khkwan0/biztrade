import * as TYPES from "./types";
import config from "../../assets/configs/config";
import Utility from "../../library/Utility";

import AsyncStorage from '@react-native-async-storage/async-storage'

//import { AccessToken } from "react-native-fbsdk";
import OneSignal from "react-native-onesignal"

////////////////////////////////////////////////////// Exported function ///////////////////////////////////////////////////////////////////////

// export const (actionName) = (param) => {
//    return {
//      type: TYPES.type,
//      payload: param
//    }
//}

// export const (actionName) = (param) => {
//    return dispatch => {
//         try {
//             Your function here!

//             dispatch({
//                 type: TYPES.type,
//                 payload: param
//             })

//         } catch (err) {
//             console.log(err);
//         }
//    }
// }

let userData = null

export const startLoginProcess = () => {
  return async dispatch => {
    console.log('startloginprocess')
    try {
      // Check if signed in before
      const access_token = await getAccessToken()
      const jwt_token = await GetJWTToken()
      let user = null
      if ((jwt_token === undefined || !jwt_token) && access_token) {
        user = await Utility.GetFromServer('/v1/userinfo?token=' + access_token)
        if (user !== undefined && user.token !== undefined && user.token) {  
          await SetJWTToken(user.token)
        }
      } 
      if (jwt_token !== undefined && jwt_token) {
        try {
          res = await Utility.GetFromServer('/v2/userinfo')
          if (res.err === 0) {
            user = res.msg
            await SetJWTToken(user.token)
          }
        } catch(e) {
          console.log(e)
          throw new Error(e)
        }
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
          _id: '',
          email: '',
          name: '',
          is_vendor: false,
          location_id: '',
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

export const setToken = async (token) => {
  await AsyncStorage.setItem(config.storage.key_prefix + "local_token", token);
}

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

isFacebookToken = access_token => {
  // access_token.accessToken != undefined mean that this access token come from facebook
  if (typeof access_token.accessToken !== "undefined") {
    return true;
  } else {
    return false;
  }
};

GetJWTToken = async () => {
  try {
  const _token = await AsyncStorage.getItem(config.storage.key_prefix + "jwt")
  return (_token === undefined)?null:_token
  } catch(e) {
    return null
  }
}

getAccessToken = async () => {
  let token = null;

  // Get current token from fbsdk
//  token = await AccessToken.getCurrentAccessToken();
  if (!token) {
    token = await AsyncStorage.getItem(config.storage.key_prefix + "local_token")
  }
  if (typeof token === "undefined") {
    token = null
  }
  return token
}

SetJWTToken = async (token) => {
  await AsyncStorage.setItem(config.storage.key_prefix + "jwt", token)
}

GetUserInfo = async (token) => {
  try {
    const user = await this.nonFacebookLogin(token)
    return user;
  } catch (e) {
    return null;
  }
};

appLogin = async (email, name) => {
  try {
    console.log("applogin", email);
    let user = await Utility.PostToServer("/postlogin", {
      email: email,
      name: name
    });
    return user;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

updateCreditCardCustomerId = async data => {
  // check if post login created a new CC Customer ID
  if (
    typeof data.customer !== "undefined" &&
    typeof data.customer.id !== "undefined"
  ) {
    let ccid = data.customer.id;

    // save in CCID in local storage
    this.saveCCID(ccid);
  } else {
    // no CC Customer ID created on backend
    // therefore it is already stored in the DB
    // make sure the CC Customed ID was returned from the backend
    if (
      typeof data.user !== "undefined" &&
      typeof data.user.cc_id !== "undefined"
    ) {
      // postlogin indeed returned a cc id...
      // see if we have it in local storage already
      try {
        const _ccid = await AsyncStorage.getItem(
          config.storage.key_prefix + "ccid"
        );

        // we do have a value in local storage already
        // check if it's the same...
        if (_ccid != data.user.cc_id) {
          // not the same...save the new one
          saveCCID(data.user.cc_id);
        }
      } catch (err) {
        console.log(err);
        saveCCID(data.user.cc_id);
      }
    }
  }
};

saveCCID = ccid => {
  console.log("saveccid", ccid);
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(config.storage.key_prefix + "ccid", ccid)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

onIds = async device => {
  console.log("onIds", device)
  let player_id = device.userId;
  if (player_id) {
    console.log('player id', player_id)
    await updatePushCredentials(player_id);
  }
  // this.setState({
  //   user: this.user_data.user,
  //   logged_in: true,
  //   showLoading: false
  // });
};

updatePushCredentials = async player_id => {
    console.log("updatePushCredentials");
    AsyncStorage.setItem(config.storage.key_prefix + "push_user_id", player_id);
    if (
      typeof userData !== "undefined" &&
      userData.email
    ) {
      try {
        let res = await saveNewPushId(player_id, userData.email);
        OneSignal.setSubscription(true);
        OneSignal.getPermissionSubscriptionState(status => {
          console.log("push status", status)
        })
        return res
      } catch (e) {
        console.log(e);
        throw new Error(e)
      }
    } else {
      console.log("update push credentials: no email");
      throw new Error(e)
    }
}

saveNewPushId = async (player_id, email) => {
  try {
    console.log("savenewpushid", player_id, email)
    console.log(config.push.provider.name)

    let res = await Utility.PostToServer("/pushid/" + config.push.provider.name, { email: email, push_id: player_id })
    return res
  } catch (e) {
    console.log("savenewpushid errr", e)
    throw new Error(e);
  }
};

nonFacebookLogin = async token => {
  if (typeof token !== "undefined" && token) {
    try {
      let json = await Utility.GetFromServer("/userinfo?token=" + token)
      //console.log('nonfacebooklogin json: ',json)
      return json
    } catch (e) {
      console.log("error nonfacebooklogin", e)
      throw new Error(e);
    }
  } else {
    console.log("no token");
    throw new Error("no token");
  }
};
import config from '../assets/configs/config'
import AsyncStorage from '@react-native-async-storage/async-storage'

Utility = {
  DeleteFromServer: async (endpoint, data) => {
    try {
      let token = await AsyncStorage.getItem(config.storage.key_prefix + "jwt")
      const headers = {}
      if (token) {
        headers['Authorization'] = 'Bearer ' + token
      }
      let res = await fetch(config.api._url() + endpoint, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...headers
        },
        body: JSON.stringify(data)
      });
      return res.json();
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
  PostToServer: async (endpoint, data) => {
    try {
      let token = await AsyncStorage.getItem(config.storage.key_prefix + "jwt")
      const headers = {}
      if (token) {
        headers['Authorization'] = 'Bearer ' + token
      }
      let res = await fetch(config.api._url() + endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...headers
        },
        body: JSON.stringify(data)
      });
      return res.json();
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
  GetFromServer: async (endpoint) => {
    try {
      let token = await AsyncStorage.getItem(config.storage.key_prefix + "jwt")
      const headers = {}
      if (token) {
        headers['Authorization'] = 'Bearer ' + token
      }
      const res = await fetch(config.api._url() + endpoint, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          ...headers
        }
      })
      return res.json()
    } catch (e) {
      throw new Error(e)
    }
  },
  GetLocal: async key => {
    try {
      let value = await syncStorage.getItem(config.storage.key_prefix + key);
      return value;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
  SaveLocal: async (key, value) => {
    try {
      let res = await AsyncStorage.setItem(
        config.storage.key_prefix + key,
        value
      );
      return res;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
  getCCCustomerID: async card => {
    try {
      let ccid = AsyncStorage.getItem(config.storage.key_prefix + "ccid");
      if (ccid) {
        return { ccud: ccid, card: card };
      } else {
        throw new Error(ccid);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  GetCCToken: card => {
    return new Promise((resolve, reject) => {
      fetch(config.ccprocessor.stripe.api.endpoint + "/tokens", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + config.ccprocessor.stripe.public_key(),
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body:
          "card[number]=" +
          card.cardNumber +
          "&card[exp_month]=" +
          card.expiryMonth +
          "&card[exp_year]=" +
          card.expiryYear +
          "&card[cvc]=" +
          card.cvv
      })
        .then(res => {
          return res.json()
        })
        .then(resJson => {
          resolve(resJson)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default Utility
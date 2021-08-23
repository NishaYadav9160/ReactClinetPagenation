import { createStore } from "redux";
import reducer from "./reducer";

var crypto_eval = require("crypto-js");

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    var ciphertext = crypto_eval.AES.encrypt(
      serializedState,
      process.env.REACT_APP_ENCRYPT_DECRYPT_KEY
    );
    localStorage.setItem("state", ciphertext);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    var bytes = crypto_eval.AES.decrypt(
      serializedState.toString(),
      process.env.REACT_APP_ENCRYPT_DECRYPT_KEY
    );
    var plaintext = bytes.toString(crypto_eval.enc.Utf8);
    if (plaintext === null) return undefined;
    return JSON.parse(plaintext);
  } catch (e) {
    console.log(e);
  }
}

const persistedState = loadFromLocalStorage();
const store = createStore(reducer, persistedState);
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;

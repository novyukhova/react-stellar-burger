import {
  register as apiRegister,
  login as apiLogin,
  logout as apiLogout,
  setTokens,
} from "../../utils/api";
import { userLoaded } from "./profile";

const REGISTERED = "REGISTERED";
const REGISTER_ERROR = "REGISTER_ERROR";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGGED_OUT = "LOGGED_OUT";
const NAVIGATE_TO_LOGIN = "NAVIGATE_TO_LOGIN";

function sendRegisterForm(name, email, password) {
  return (dispatch) =>
    apiRegister(name, email, password)
      .then((res) => {
        if (res.success) {
          dispatch(registered());
          dispatch(loginSuccess());
          dispatch(userLoaded(res.user));
          setTokens(res.accessToken, res.refreshToken);
          return;
        }
        dispatch(registerError(res.message));
      })
      .catch(console.error);
}

function sendLoginForm(email, password) {
  return (dispatch) =>
    apiLogin(email, password)
      .then((res) => {
        if (res.success) {
          dispatch(loginSuccess());
          dispatch(userLoaded(res.user));
          setTokens(res.accessToken, res.refreshToken);
          return;
        }
        dispatch(loginError(res.message));
      })
      .catch(console.error);
}

function registered() {
  return {
    type: REGISTERED,
  };
}

function registerError(message) {
  return {
    type: REGISTER_ERROR,
    message: message,
  };
}

function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

function loginError(message) {
  return {
    type: LOGIN_ERROR,
    message: message,
  };
}

function loggedOut() {
  return {
    type: LOGGED_OUT,
  };
}

function logout() {
  return (dispatch) =>
    apiLogout()
      .then(() => {
        dispatch(loggedOut());
      })
      .catch(console.error);
}

function navigateToLogin() {
  return {
    type: NAVIGATE_TO_LOGIN,
  };
}

export {
  sendRegisterForm,
  REGISTERED,
  REGISTER_ERROR,
  sendLoginForm,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  loggedOut,
  LOGGED_OUT,
  logout,
  navigateToLogin,
  NAVIGATE_TO_LOGIN,
};

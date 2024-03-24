import { Dispatch } from "redux";
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

function sendRegisterForm(name: string, email: string, password: string) {
  return (dispatch: Dispatch) =>
    apiRegister(name, email, password)
      .then((res) => {
        if (res.success) {
          dispatch(registered());
          dispatch(loginSuccess());
          dispatch(userLoaded(res.user));
          setTokens(res.accessToken, res.refreshToken);
          return;
        }
        dispatch(
          registerError(
            res.message ?? "Something went wrong. Please try again."
          )
        );
      })
      .catch(console.error);
}

function sendLoginForm(email: string, password: string) {
  return (dispatch: Dispatch) =>
    apiLogin(email, password)
      .then((res) => {
        if (res.success) {
          dispatch(loginSuccess());
          dispatch(userLoaded(res.user));
          setTokens(res.accessToken, res.refreshToken);
          return;
        }
        dispatch(
          loginError(res.message ?? "Something went wrong. Please try again.")
        );
      })
      .catch(console.error);
}

function registered() {
  return {
    type: REGISTERED,
  };
}

function registerError(message: string) {
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

function loginError(message: string) {
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
  return (dispatch: Dispatch) =>
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

import { Dispatch } from "redux";
import {
  register as apiRegister,
  login as apiLogin,
  logout as apiLogout,
  setTokens,
} from "../../utils/api";
import { userLoaded } from "./profile";

import {
  REGISTERED,
  REGISTER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGGED_OUT,
  NAVIGATE_TO_LOGIN,
} from "../constants/auth";
import { AppDispatch, AppThunk } from "../types";

const sendRegisterForm: AppThunk =
  (name: string, email: string, password: string) => (dispatch: AppDispatch) =>
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

const sendLoginForm: AppThunk =
  (email: string, password: string) => (dispatch: Dispatch) =>
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

type TRegisteredAction = {
  type: typeof REGISTERED;
};

type TRegisterErrorAction = {
  type: typeof REGISTER_ERROR;
  message: string;
};

type TLoginSuccessAction = {
  type: typeof LOGIN_SUCCESS;
};

type TLoginErrorAction = {
  type: typeof LOGIN_ERROR;
  message: string;
};

type TLoggedOutAction = {
  type: typeof LOGGED_OUT;
};

type TNavigateToLoginAction = {
  type: typeof NAVIGATE_TO_LOGIN;
};

type TAuthAction =
  | TRegisteredAction
  | TRegisterErrorAction
  | TLoginSuccessAction
  | TLoginErrorAction
  | TLoggedOutAction
  | TNavigateToLoginAction;

function registered(): TRegisteredAction {
  return {
    type: REGISTERED,
  };
}

function registerError(message: string): TRegisterErrorAction {
  return {
    type: REGISTER_ERROR,
    message: message,
  };
}

function loginSuccess(): TLoginSuccessAction {
  return {
    type: LOGIN_SUCCESS,
  };
}

function loginError(message: string): TLoginErrorAction {
  return {
    type: LOGIN_ERROR,
    message: message,
  };
}

function loggedOut(): TLoggedOutAction {
  return {
    type: LOGGED_OUT,
  };
}

const logout: AppThunk = () => (dispatch: Dispatch) =>
  apiLogout()
    .then(() => {
      dispatch(loggedOut());
    })
    .catch(console.error);

function navigateToLogin(): TNavigateToLoginAction {
  return {
    type: NAVIGATE_TO_LOGIN,
  };
}

export { sendRegisterForm, sendLoginForm, loggedOut, logout, navigateToLogin };

export type { TAuthAction };

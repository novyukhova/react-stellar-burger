import {
  sendResetEmail as apiSendResetEmail,
  resetPassword as apiResetPassword,
} from "../../utils/api";
import { navigateToLogin } from "./auth";

const RESET_EMAIL_SENT = "RESET_EMAIL_SENT";
const PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS";
const PASSWORD_RESET_ERROR = "PASSWORD_RESET_ERROR";
const RESET_PASSWORD_OPENED = "RESET_PASSWORD_OPENED";

function sendResetEmail(email) {
  return (dispatch) =>
    apiSendResetEmail(email)
      .then((res) => dispatch(resetEmailSent()))
      .catch(console.error);
}

function resetEmailSent() {
  return {
    type: RESET_EMAIL_SENT,
  };
}

function resetPasswordOpened() {
  return {
    type: RESET_PASSWORD_OPENED,
  };
}

function resetPassword(password, token) {
  return (dispatch) =>
    apiResetPassword(password, token)
      .then((res) => {
        if (res.success) {
          dispatch(passwordResetSuccess());
          dispatch(navigateToLogin());
        }
        dispatch(passwordResetError(res.message));
      })
      .catch(() =>
        dispatch(passwordResetError("Something went wrong. Try again later"))
      );
}

function passwordResetSuccess() {
  return {
    type: PASSWORD_RESET_SUCCESS,
  };
}

function passwordResetError(message) {
  return {
    type: PASSWORD_RESET_ERROR,
    message: message,
  };
}

export {
  sendResetEmail,
  RESET_EMAIL_SENT,
  resetPassword,
  PASSWORD_RESET_SUCCESS,
  resetPasswordOpened,
  RESET_PASSWORD_OPENED,
};

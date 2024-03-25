import { Dispatch } from "redux";
import {
  sendResetEmail as apiSendResetEmail,
  resetPassword as apiResetPassword,
} from "../../utils/api";
import { navigateToLogin } from "./auth";
import {
  RESET_EMAIL_SENT,
  RESET_PASSWORD_OPENED,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
} from "../constants/reset-password";
import { AppThunk } from "../types";

const sendResetEmail: AppThunk = (email: string) => (dispatch: Dispatch) =>
  apiSendResetEmail(email)
    .then((res) => dispatch(resetEmailSent()))
    .catch(console.error);

type TResetEmailSentAction = {
  type: typeof RESET_EMAIL_SENT;
};

type TResetPasswordOpenedAction = {
  type: typeof RESET_PASSWORD_OPENED;
};

type TPasswordResetSuccessAction = {
  type: typeof PASSWORD_RESET_SUCCESS;
};

type TPasswordResetErrorAction = {
  type: typeof PASSWORD_RESET_ERROR;
  message: string;
};

type TResetPasswordAction =
  | TResetEmailSentAction
  | TResetPasswordOpenedAction
  | TPasswordResetSuccessAction
  | TPasswordResetErrorAction;

function resetEmailSent(): TResetEmailSentAction {
  return {
    type: RESET_EMAIL_SENT,
  };
}

function resetPasswordOpened(): TResetPasswordOpenedAction {
  return {
    type: RESET_PASSWORD_OPENED,
  };
}

const resetPassword: AppThunk =
  (password: string, token: string) => (dispatch: Dispatch) =>
    apiResetPassword(password, token)
      .then((res) => {
        if (res.success) {
          dispatch(passwordResetSuccess());
          dispatch(navigateToLogin());
        }
        dispatch(
          passwordResetError(
            res.message ?? "Something went wrong. Try again later"
          )
        );
      })
      .catch(() =>
        dispatch(passwordResetError("Something went wrong. Try again later"))
      );

function passwordResetSuccess(): TPasswordResetSuccessAction {
  return {
    type: PASSWORD_RESET_SUCCESS,
  };
}

function passwordResetError(message: string): TPasswordResetErrorAction {
  return {
    type: PASSWORD_RESET_ERROR,
    message: message,
  };
}

export { sendResetEmail, resetPassword, resetPasswordOpened };

export type { TResetPasswordAction };

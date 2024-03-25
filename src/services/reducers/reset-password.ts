import { TResetPasswordAction } from "../actions/reset-password";
import {
  RESET_EMAIL_SENT,
  RESET_PASSWORD_OPENED,
} from "../constants/reset-password";

type TResetPasswordState = {
  resetEmailSent: boolean;
};

const initialState = {
  resetEmailSent: false,
};

function resetPasswordReducer(
  state: TResetPasswordState = initialState,
  action: TResetPasswordAction
) {
  switch (action.type) {
    case RESET_EMAIL_SENT:
      return {
        ...state,
        resetEmailSent: true,
      };
    case RESET_PASSWORD_OPENED:
      return {
        ...state,
        resetEmailSent: false,
      };
    default:
      return state;
  }
}

export { resetPasswordReducer, initialState };

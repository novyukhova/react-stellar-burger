import {
  RESET_EMAIL_SENT,
  RESET_PASSWORD_OPENED,
} from "../actions/reset-password";

const initialState = {
  resetEmailSent: false,
};

function resetPasswordReducer(state = initialState, action) {
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

export { resetPasswordReducer };

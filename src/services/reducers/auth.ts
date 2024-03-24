import { getCookie } from "../../utils/cookie";
import { HOME_OPENED, LOGIN_PAGE_OPENED } from "../actions";
import { LOGIN_SUCCESS, LOGGED_OUT, NAVIGATE_TO_LOGIN } from "../actions/auth";

const refreshToken = getCookie("token");

const initialState = {
  isAuthenticated: refreshToken && refreshToken !== "",
  navigateHome: false,
  navigateToLogin: false,
};

function authReducer(state = initialState, action: { type: string }) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        navigateHome: true,
      };
    case HOME_OPENED:
      return {
        ...state,
        navigateHome: false,
      };
    case LOGGED_OUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_PAGE_OPENED:
      return {
        ...state,
        navigateToLogin: false,
      };
    case NAVIGATE_TO_LOGIN:
      return {
        ...state,
        navigateToLogin: true,
      };
    default:
      return state;
  }
}

export { authReducer };

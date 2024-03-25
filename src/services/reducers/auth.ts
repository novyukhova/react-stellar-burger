import { getCookie } from "../../utils/cookie";
import { HOME_OPENED, LOGIN_PAGE_OPENED } from "../constants/common";
import {
  LOGIN_SUCCESS,
  LOGGED_OUT,
  NAVIGATE_TO_LOGIN,
} from "../constants/auth";

const refreshToken = getCookie("token");

type TAuthState = {
  isAuthenticated: boolean;
  navigateHome: boolean;
  navigateToLogin: boolean;
};

const initialState = {
  isAuthenticated: Boolean(refreshToken && refreshToken !== ""),
  navigateHome: false,
  navigateToLogin: false,
};

function authReducer(
  state: TAuthState = initialState,
  action: { type: string }
) {
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

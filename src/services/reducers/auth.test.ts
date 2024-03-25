import { authReducer, getInitialState } from "./auth";

jest.mock("../../utils/cookie", () => ({
  getCookie: jest.fn(() => ""),
}));
import { getCookie } from "../../utils/cookie";
import { loggedOut, loginSuccess, navigateToLogin } from "../actions/auth";
import { homeOpened, loginPageOpened } from "../actions";

describe("getInitialState", () => {
  it("should return initial state", () => {
    expect(getInitialState()).toEqual({
      isAuthenticated: false,
      navigateHome: false,
      navigateToLogin: false,
    });
  });

  it("should return isAuthenticated true if has token", () => {
    (getCookie as jest.Mock).mockReturnValueOnce("token");
    expect(getInitialState()).toEqual({
      isAuthenticated: true,
      navigateHome: false,
      navigateToLogin: false,
    });
  });
});

describe("authReducer", () => {
  const initialState = getInitialState();

  it("should return the initial state", () => {
    expect(authReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should set isAuthenticated on loginSuccess", () => {
    expect(authReducer(initialState, loginSuccess())).toEqual({
      ...initialState,
      isAuthenticated: true,
      navigateHome: true,
    });
  });

  it("should reset navigateHome on homeOpened", () => {
    const stateBefore = {
      ...initialState,
      isAuthenticated: true,
      navigateHome: true,
    };

    expect(authReducer(stateBefore, homeOpened())).toEqual({
      ...stateBefore,
      navigateHome: false,
    });
  });

  it("should set isAuthenticated false on loggedOut", () => {
    const stateBefore = {
      isAuthenticated: true,
      navigateHome: false,
      navigateToLogin: false,
    };
    expect(authReducer(stateBefore, loggedOut())).toEqual({
      ...stateBefore,
      isAuthenticated: false,
    });
  });

  it("should reset navigateToLogin on loginPageOpened", () => {
    const stateBefore = {
      ...initialState,
      navigateToLogin: true,
    };
    expect(authReducer(stateBefore, loginPageOpened())).toEqual({
      ...stateBefore,
      navigateToLogin: false,
    });
  });

  it("should set navigateToLogin on navigateToLogin", () => {
    expect(authReducer(initialState, navigateToLogin())).toEqual({
      ...initialState,
      navigateToLogin: true,
    });
  });
});

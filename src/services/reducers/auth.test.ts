import { authReducer } from "./auth";

jest.mock("../../utils/cookie", () => ({
  getCookie: jest.fn(() => ""),
}));
import { getCookie } from "../../utils/cookie";
import { login } from "../../utils/api";
import { loggedOut, loginSuccess, navigateToLogin } from "../actions/auth";
import { homeOpened, loginPageOpened } from "../actions";

describe("authReducer", () => {
  it("should return the initial state", () => {
    expect(authReducer(undefined, {} as any)).toEqual({
      isAuthenticated: false,
      navigateHome: false,
      navigateToLogin: false,
    });
  });

  it("should return isAuthenticated true if has token", () => {
    (getCookie as jest.Mock).mockReturnValueOnce("token");

    expect(authReducer(undefined, {} as any)).toEqual({
      isAuthenticated: true,
      navigateHome: false,
      navigateToLogin: false,
    });
  });

  it("should set isAuthenticated on loginSuccess", () => {
    expect(
      authReducer(
        {
          isAuthenticated: false,
          navigateHome: false,
          navigateToLogin: false,
        },
        loginSuccess()
      )
    ).toEqual({
      isAuthenticated: true,
      navigateHome: true,
      navigateToLogin: false,
    });
  });

  it("should reset navigateHome on homeOpened", () => {
    expect(
      authReducer(
        {
          isAuthenticated: true,
          navigateHome: true,
          navigateToLogin: false,
        },
        homeOpened()
      )
    ).toEqual({
      isAuthenticated: true,
      navigateHome: false,
      navigateToLogin: false,
    });
  });

  it("should set isAuthenticated false on loggedOut", () => {
    expect(
      authReducer(
        {
          isAuthenticated: true,
          navigateHome: false,
          navigateToLogin: false,
        },
        loggedOut()
      )
    ).toEqual({
      isAuthenticated: false,
      navigateHome: false,
      navigateToLogin: false,
    });
  });

  it("should reset navigateToLogin on loginPageOpened", () => {
    expect(
      authReducer(
        {
          isAuthenticated: false,
          navigateHome: false,
          navigateToLogin: true,
        },
        loginPageOpened()
      )
    ).toEqual({
      isAuthenticated: false,
      navigateHome: false,
      navigateToLogin: false,
    });
  });

  it("should set navigateToLogin on navigateToLogin", () => {
    expect(
      authReducer(
        {
          isAuthenticated: false,
          navigateHome: false,
          navigateToLogin: false,
        },
        navigateToLogin()
      )
    ).toEqual({
      isAuthenticated: false,
      navigateHome: false,
      navigateToLogin: true,
    });
  });
});

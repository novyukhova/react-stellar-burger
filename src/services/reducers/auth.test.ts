import { authReducer } from "./auth";

jest.mock("../../utils/cookie", () => ({
  getCookie: jest.fn(() => ""),
}));
import { getCookie } from "../../utils/cookie";

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

  it("should set isAuthenticated on LOGIN_SUCCESS", () => {
    expect(
      authReducer(
        {
          isAuthenticated: false,
          navigateHome: false,
          navigateToLogin: false,
        },
        { type: "LOGIN_SUCCESS" }
      )
    ).toEqual({
      isAuthenticated: true,
      navigateHome: true,
      navigateToLogin: false,
    });
  });

  it("should reset navigateHome on HOME_OPENED", () => {
    expect(
      authReducer(
        {
          isAuthenticated: true,
          navigateHome: true,
          navigateToLogin: false,
        },
        { type: "HOME_OPENED" }
      )
    ).toEqual({
      isAuthenticated: true,
      navigateHome: false,
      navigateToLogin: false,
    });
  });

  it("should set isAuthenticated false on LOGGED_OUT", () => {
    expect(
      authReducer(
        {
          isAuthenticated: true,
          navigateHome: false,
          navigateToLogin: false,
        },
        { type: "LOGGED_OUT" }
      )
    ).toEqual({
      isAuthenticated: false,
      navigateHome: false,
      navigateToLogin: false,
    });
  });

  it("should reset navigateToLogin on LOGIN_PAGE_OPENED", () => {
    expect(
      authReducer(
        {
          isAuthenticated: false,
          navigateHome: false,
          navigateToLogin: true,
        },
        { type: "LOGIN_PAGE_OPENED" }
      )
    ).toEqual({
      isAuthenticated: false,
      navigateHome: false,
      navigateToLogin: false,
    });
  });

  it("should set navigateToLogin on NAVIGATE_TO_LOGIN", () => {
    expect(
      authReducer(
        {
          isAuthenticated: false,
          navigateHome: false,
          navigateToLogin: false,
        },
        { type: "NAVIGATE_TO_LOGIN" }
      )
    ).toEqual({
      isAuthenticated: false,
      navigateHome: false,
      navigateToLogin: true,
    });
  });
});

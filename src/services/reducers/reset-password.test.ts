import { resetEmailSent, resetPasswordOpened } from "../actions/reset-password";
import { resetPasswordReducer, initialState } from "./reset-password";

describe("resetPasswordReducer", () => {
  it("should return the initial state", () => {
    expect(resetPasswordReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should set resetEmailSent true on resetEmailSent", () => {
    expect(resetPasswordReducer(initialState, resetEmailSent())).toEqual({
      ...initialState,
      resetEmailSent: true,
    });
  });

  it("should set resetEmailSent false on resetPasswordOpened", () => {
    expect(
      resetPasswordReducer(
        {
          ...initialState,
          resetEmailSent: true,
        },
        resetPasswordOpened()
      )
    ).toEqual({
      ...initialState,
      resetEmailSent: false,
    });
  });
});

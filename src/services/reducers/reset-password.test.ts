import { resetEmailSent, resetPasswordOpened } from "../actions/reset-password";
import { resetPasswordReducer } from "./reset-password";

describe("resetPasswordReducer", () => {
  it("should return the initial state", () => {
    expect(resetPasswordReducer(undefined, {} as any)).toEqual({
      resetEmailSent: false,
    });
  });

  it("should set resetEmailSent true on resetEmailSent", () => {
    expect(
      resetPasswordReducer(
        {
          resetEmailSent: false,
        },
        resetEmailSent()
      )
    ).toEqual({
      resetEmailSent: true,
    });
  });

  it("should set resetEmailSent false on resetPasswordOpened", () => {
    expect(
      resetPasswordReducer(
        {
          resetEmailSent: true,
        },
        resetPasswordOpened()
      )
    ).toEqual({
      resetEmailSent: false,
    });
  });
});

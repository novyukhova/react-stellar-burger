import { profileReducer, initialState } from "./profile";
import { userLoaded } from "../actions/profile";

describe("profileReducer", () => {
  it("should return the initial state", () => {
    expect(profileReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should set user on userLoaded", () => {
    const user = {
      email: "email",
      name: "name",
      password: "password",
    };

    expect(profileReducer(initialState, userLoaded(user))).toEqual({
      user,
    });
  });
});

import { profileReducer } from "./profile";
import { userLoaded } from "../actions/profile";

describe("profileReducer", () => {
  it("should return the initial state", () => {
    expect(profileReducer(undefined, {} as any)).toEqual({
      user: null,
    });
  });

  it("should set user on userLoaded", () => {
    const user = {
      email: "email",
      name: "name",
      password: "password",
    };

    expect(
      profileReducer(
        {
          user: null,
        },
        userLoaded(user)
      )
    ).toEqual({
      user,
    });
  });
});

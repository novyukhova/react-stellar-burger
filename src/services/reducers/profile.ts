import { TUser } from "../../utils/api";
import { TProfileAction } from "../actions/profile";
import { USER_LOADED } from "../constants/profile";

type TProfileState = {
  user: TUser | null;
};

const initialState = {
  user: null,
};

function profileReducer(
  state: TProfileState = initialState,
  action: TProfileAction
) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}

export { profileReducer, initialState };

import { USER_LOADED } from "../actions/profile";

const initialState = {
  user: null,
};

function profileReducer(state = initialState, action) {
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

export { profileReducer };

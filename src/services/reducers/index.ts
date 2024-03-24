import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";
import { resetPasswordReducer } from "./reset-password";
import { authReducer } from "./auth";
import { profileReducer } from "./profile";
import { wsReducer } from "./ws";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  resetPassword: resetPasswordReducer,
  auth: authReducer,
  profile: profileReducer,
  ws: wsReducer,
});

export { rootReducer };

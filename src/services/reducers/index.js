import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
});

export { rootReducer };

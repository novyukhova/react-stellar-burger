import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { composeWithDevTools } from "@redux-devtools/extension";

const enhancer = composeWithDevTools(
  applyMiddleware(thunk),
  applyMiddleware(socketMiddleware())
);

const store = createStore(rootReducer, enhancer);

export { store };

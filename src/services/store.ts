import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import { composeEnhancers } from "../compose";
import { socketMiddleware } from "./middleware/socketMiddleware";

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(socketMiddleware())
);

const store = createStore(rootReducer, enhancer);

export { store };

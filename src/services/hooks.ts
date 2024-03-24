import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { AppDispatch, AppThunk, TCommonState } from "./types";

export const useSelector: TypedUseSelectorHook<TCommonState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

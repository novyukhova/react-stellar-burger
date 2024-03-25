import { Action, ActionCreator, Dispatch } from "redux";
import { store } from "../store";
import { TCommonActions } from "../actions";
import { TAuthAction } from "../actions/auth";
import { TIngredientsAction } from "../actions/ingredients";
import { TOrderAction } from "../actions/order";
import { TProfileAction } from "../actions/profile";
import { TResetPasswordAction } from "../actions/reset-password";
import { ThunkAction } from "redux-thunk";
import { TWSActions } from "../actions/ws";

export type TCommonState = ReturnType<typeof store.getState>;

export type TApplicationAction =
  | TCommonActions
  | TProfileAction
  | TOrderAction
  | TAuthAction
  | TResetPasswordAction
  | TIngredientsAction
  | TWSActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TCommonState, TApplicationAction>
>;

export type AppDispatch = Dispatch<TApplicationAction>;

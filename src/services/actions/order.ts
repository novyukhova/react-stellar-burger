import { Dispatch } from "redux";
import {
  TIngredient,
  createOrder as apiCreateOrder,
  TOrder,
} from "../../utils/api";
import { loggedOut, navigateToLogin } from "./auth";
import { TFilling } from "../types/data";
import {
  DELETED_FILLING_IN_ORDER,
  FILLING_MOVED,
  NEW_INGREDIENT_IN_ORDER,
  ORDER_ACCEPTED,
  ORDER_DETAILS_CLOSED,
} from "../constants/order";
import { AppThunk } from "../types";

function orderAccepted(order: TOrder): TOrderAcceptedAction {
  return {
    type: ORDER_ACCEPTED,
    order,
  };
}

type TOrderAcceptedAction = {
  type: typeof ORDER_ACCEPTED;
  order: TOrder;
};

const createOrder: AppThunk =
  (ingredientsId: string[]) => (dispatch: Dispatch) =>
    apiCreateOrder(ingredientsId)
      .then((res) => dispatch(orderAccepted(res.order)))
      .catch((err) => {
        if (err?.status === 401) {
          dispatch(loggedOut());
          dispatch(navigateToLogin());
        }
      });

function orderDetailsClosed(): TOrderDetailsClosedAction {
  return {
    type: ORDER_DETAILS_CLOSED,
  };
}

type TOrderDetailsClosedAction = {
  type: typeof ORDER_DETAILS_CLOSED;
};

function newIngredientInOrder(
  ingredient: TIngredient
): TNewIngredientInOrderAction {
  return {
    type: NEW_INGREDIENT_IN_ORDER,
    ingredient,
  };
}

type TNewIngredientInOrderAction = {
  type: typeof NEW_INGREDIENT_IN_ORDER;
  ingredient: TIngredient;
};

function deletedFillingInOrder(
  filling: TFilling
): TDeletedFillingInOrderAction {
  return {
    type: DELETED_FILLING_IN_ORDER,
    filling,
  };
}

type TDeletedFillingInOrderAction = {
  type: typeof DELETED_FILLING_IN_ORDER;
  filling: TFilling;
};

function fillingMoved(
  movedFilling: TFilling,
  nearestOtherFilling: TFilling
): TFillingMovedAction {
  return {
    type: FILLING_MOVED,
    movedFilling,
    nearestOtherFilling,
  };
}

type TFillingMovedAction = {
  type: typeof FILLING_MOVED;
  movedFilling: TFilling;
  nearestOtherFilling: TFilling;
};

type TOrderAction =
  | TOrderAcceptedAction
  | TOrderDetailsClosedAction
  | TNewIngredientInOrderAction
  | TDeletedFillingInOrderAction
  | TFillingMovedAction;

export {
  orderAccepted,
  orderDetailsClosed,
  newIngredientInOrder,
  deletedFillingInOrder,
  fillingMoved,
  createOrder,
};

export type { TOrderAction };

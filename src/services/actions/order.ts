import { Dispatch } from "redux";
import {
  TIngredient,
  createOrder as apiCreateOrder,
  TOrder,
} from "../../utils/api";
import { loggedOut, navigateToLogin } from "./auth";
import { TFilling } from "../../utils/types";

const ORDER_ACCEPTED = "ORDER_ACCEPTED";

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

function createOrder(ingredientsId: string[]) {
  return (dispatch: Dispatch) =>
    apiCreateOrder(ingredientsId)
      .then((res) => dispatch(orderAccepted(res.order)))
      .catch((err) => {
        if (err?.status === 401) {
          dispatch(loggedOut());
          dispatch(navigateToLogin());
        }
      });
}

const ORDER_DETAILS_CLOSED = "ORDER_DETAILS_CLOSED";

function orderDetailsClosed(): TOrderDetailsClosedAction {
  return {
    type: ORDER_DETAILS_CLOSED,
  };
}

type TOrderDetailsClosedAction = {
  type: typeof ORDER_DETAILS_CLOSED;
};

const NEW_INGREDIENT_IN_ORDER = "NEW_INGREDIENT_IN_ORDER";

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

const DELETED_FILLING_IN_ORDER = "DELETED_INGREDIENT_IN_ORDER";

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

const FILLING_MOVED = "FILLING_MOVED";

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
  ORDER_ACCEPTED,
  orderAccepted,
  ORDER_DETAILS_CLOSED,
  orderDetailsClosed,
  NEW_INGREDIENT_IN_ORDER,
  newIngredientInOrder,
  DELETED_FILLING_IN_ORDER,
  deletedFillingInOrder,
  FILLING_MOVED,
  fillingMoved,
  createOrder,
};

export type { TOrderAction };

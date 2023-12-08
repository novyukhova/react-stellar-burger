import { createOrder as apiCreateOrder } from "../../utils/api";

const ORDER_ACCEPTED = "ORDER_ACCEPTED";

function orderAccepted(orderId) {
  return {
    type: ORDER_ACCEPTED,
    orderId,
  };
}

function createOrder(ingredientsId) {
  return (dispatch) =>
    apiCreateOrder(ingredientsId)
      .then((res) => dispatch(orderAccepted(res.order.number)))
      .catch(console.error);
}

const ORDER_DETAILS_CLOSED = "ORDER_DETAILS_CLOSED";

function orderDetailsClosed() {
  return {
    type: ORDER_DETAILS_CLOSED,
  };
}

const NEW_INGREDIENT_IN_ORDER = "NEW_INGREDIENT_IN_ORDER";

function newIngredientInOrder(ingredient) {
  return {
    type: NEW_INGREDIENT_IN_ORDER,
    ingredient,
  };
}

const DELETED_FILLING_IN_ORDER = "DELETED_INGREDIENT_IN_ORDER";

function deletedFillingInOrder(filling) {
  return {
    type: DELETED_FILLING_IN_ORDER,
    filling,
  };
}

const FILLING_MOVED = "FILLING_MOVED";

function fillingMoved(movedFilling, nearestOtherFilling) {
  return {
    type: FILLING_MOVED,
    movedFilling,
    nearestOtherFilling,
  };
}

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

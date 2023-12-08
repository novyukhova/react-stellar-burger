import { createOrder as apiCreateOrder, getIngredients } from "../../utils/api";

const INGREDIENTS_LOADED = "INGREDIENTS_LOADED";

function ingredientsLoaded(ingredients) {
  return {
    type: INGREDIENTS_LOADED,
    ingredients,
  };
}

function loadIngredients() {
  return (dispatch) =>
    getIngredients()
      .then((x) => dispatch(ingredientsLoaded(x)))
      .catch(console.error);
}

const CURRENT_INGREDIENT_CHANGED = "CURRENT_INGREDIENT_CHANGED";

function currentIngredientChanged(ingredient) {
  return {
    type: CURRENT_INGREDIENT_CHANGED,
    ingredient,
  };
}

const ORDER_ACCEPTED = "ORDER_ACCEPTED";

function orderAccepted(orderId) {
  return {
    type: ORDER_ACCEPTED,
    orderId,
  };
}

function createOrder(ingredientsId) {
  return (dispatch) =>
    apiCreateOrder(ingredientsId).then((res) =>
      dispatch(orderAccepted(res.order.number))
    );
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
  INGREDIENTS_LOADED,
  ingredientsLoaded,
  CURRENT_INGREDIENT_CHANGED,
  currentIngredientChanged,
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
  loadIngredients,
};

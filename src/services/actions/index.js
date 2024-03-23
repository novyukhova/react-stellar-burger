import {
  ingredientsLoaded,
  currentIngredientChanged,
  loadIngredients,
} from "./ingredients";
import {
  orderAccepted,
  orderDetailsClosed,
  newIngredientInOrder,
  deletedFillingInOrder,
  fillingMoved,
  createOrder,
} from "./order";

const HOME_OPENED = "HOME_OPENED";
const LOGIN_PAGE_OPENED = "LOGIN_PAGE_OPENED";

function homeOpened() {
  return {
    type: HOME_OPENED,
  };
}

function loginPageOpened() {
  return {
    type: LOGIN_PAGE_OPENED,
  };
}

export {
  ingredientsLoaded,
  currentIngredientChanged,
  loadIngredients,
  orderAccepted,
  orderDetailsClosed,
  newIngredientInOrder,
  deletedFillingInOrder,
  fillingMoved,
  createOrder,
  homeOpened,
  loginPageOpened,
  HOME_OPENED,
  LOGIN_PAGE_OPENED,
};

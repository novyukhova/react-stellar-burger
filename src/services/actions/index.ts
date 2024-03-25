import { HOME_OPENED, LOGIN_PAGE_OPENED } from "../constants/common";
import { ingredientsLoaded, loadIngredients } from "./ingredients";
import {
  orderAccepted,
  orderDetailsClosed,
  newIngredientInOrder,
  deletedFillingInOrder,
  fillingMoved,
  createOrder,
} from "./order";

type THomeOpenedAction = {
  type: typeof HOME_OPENED;
};

type TLoginPageOpenedAction = {
  type: typeof LOGIN_PAGE_OPENED;
};

type TCommonActions = THomeOpenedAction | TLoginPageOpenedAction;

function homeOpened(): THomeOpenedAction {
  return {
    type: HOME_OPENED,
  };
}

function loginPageOpened(): TLoginPageOpenedAction {
  return {
    type: LOGIN_PAGE_OPENED,
  };
}

export {
  ingredientsLoaded,
  loadIngredients,
  orderAccepted,
  orderDetailsClosed,
  newIngredientInOrder,
  deletedFillingInOrder,
  fillingMoved,
  createOrder,
  homeOpened,
  loginPageOpened,
};

export type { TCommonActions };

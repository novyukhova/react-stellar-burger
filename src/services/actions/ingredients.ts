import { Dispatch } from "redux";
import { TIngredient, getIngredients } from "../../utils/api";
import { INGREDIENTS_LOADED } from "../constants/ingredients";
import { AppThunk } from "../types";

type TIngredientsLoadedAction = {
  type: typeof INGREDIENTS_LOADED;
  ingredients: TIngredient[];
};

function ingredientsLoaded(
  ingredients: TIngredient[]
): TIngredientsLoadedAction {
  return {
    type: INGREDIENTS_LOADED,
    ingredients,
  };
}

type TIngredientsAction = TIngredientsLoadedAction;

const loadIngredients: AppThunk = () => (dispatch: Dispatch) =>
  getIngredients()
    .then((x) => {
      dispatch(ingredientsLoaded(x));
    })
    .catch(console.error);

export { ingredientsLoaded, loadIngredients };
export type { TIngredientsAction };

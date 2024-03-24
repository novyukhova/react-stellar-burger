import { Dispatch } from "redux";
import { TIngredient, getIngredients } from "../../utils/api";

const INGREDIENTS_LOADED = "INGREDIENTS_LOADED";

function ingredientsLoaded(ingredients: TIngredient[]) {
  return {
    type: INGREDIENTS_LOADED,
    ingredients,
  };
}

function loadIngredients() {
  return (dispatch: Dispatch) =>
    getIngredients()
      .then((x) => {
        dispatch(ingredientsLoaded(x));
      })
      .catch(console.error);
}

export { INGREDIENTS_LOADED, ingredientsLoaded, loadIngredients };
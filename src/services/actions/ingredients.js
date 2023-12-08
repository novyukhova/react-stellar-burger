import { getIngredients } from "../../utils/api";
import { newIngredientInOrder } from "./order";

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
      .then((x) => {
        dispatch(ingredientsLoaded(x));
        const bun = x.find((ingredient) => ingredient.type === "bun");
        dispatch(newIngredientInOrder(bun));
      })
      .catch(console.error);
}

const CURRENT_INGREDIENT_CHANGED = "CURRENT_INGREDIENT_CHANGED";

function currentIngredientChanged(ingredient) {
  return {
    type: CURRENT_INGREDIENT_CHANGED,
    ingredient,
  };
}

export {
  INGREDIENTS_LOADED,
  ingredientsLoaded,
  CURRENT_INGREDIENT_CHANGED,
  currentIngredientChanged,
  loadIngredients,
};

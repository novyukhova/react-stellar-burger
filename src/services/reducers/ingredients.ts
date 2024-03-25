import { TIngredient } from "../../utils/api";
import { TIngredientsAction } from "../actions/ingredients";
import { INGREDIENTS_LOADED } from "../constants/ingredients";
type TIngredientState = {
  allIngredients: TIngredient[];
};

const initialState = {
  allIngredients: [],
};

function ingredientsReducer(
  state: TIngredientState = initialState,
  action: TIngredientsAction
) {
  switch (action.type) {
    case INGREDIENTS_LOADED:
      return {
        ...state,
        allIngredients: action.ingredients,
      };
    default:
      return state;
  }
}

export { ingredientsReducer, initialState };

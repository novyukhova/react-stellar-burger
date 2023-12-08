import {
  INGREDIENTS_LOADED,
  CURRENT_INGREDIENT_CHANGED,
} from "../actions/ingredients";

const initialState = {
  allIngredients: [],
  currentIngredient: null,
};

function ingredientsReducer(state = initialState, action) {
  switch (action.type) {
    case INGREDIENTS_LOADED:
      return {
        ...state,
        allIngredients: action.ingredients,
      };
    case CURRENT_INGREDIENT_CHANGED:
      return {
        ...state,
        currentIngredient: action.ingredient,
      };
    default:
      return state;
  }
}

export { ingredientsReducer };

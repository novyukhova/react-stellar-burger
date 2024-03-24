import { INGREDIENTS_LOADED } from "../actions/ingredients";

const initialState = {
  allIngredients: [],
};

function ingredientsReducer(state = initialState, action: { type: string }) {
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

export { ingredientsReducer };

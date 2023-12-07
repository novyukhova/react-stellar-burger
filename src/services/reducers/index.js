import {
  INGREDIENTS_LOADED,
  CURRENT_INGREDIENT_CHANGED,
  ORDER_ACCEPTED,
  ORDER_DETAILS_CLOSED,
  NEW_INGREDIENT_IN_ORDER,
  DELETED_FILLING_IN_ORDER,
  FILLING_MOVED,
} from "../actions";

const initialState = {
  allIngredients: [],
  currentIngredient: null,
  orderDetailsIsOpen: false,
  order: {
    bun: null,
    fillings: [],
    nextFillingId: 1,
  },
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case INGREDIENTS_LOADED:
      const bun = action.ingredients.find(
        (ingredient) => ingredient.type === "bun"
      );
      return {
        ...state,
        allIngredients: action.ingredients,
        order: {
          ...state.order,
          bun: bun,
        },
      };
    case CURRENT_INGREDIENT_CHANGED:
      return {
        ...state,
        currentIngredient: action.ingredient,
      };
    case ORDER_ACCEPTED:
      return {
        ...state,
        orderDetailsIsOpen: true,
      };
    case ORDER_DETAILS_CLOSED:
      return {
        ...state,
        orderDetailsIsOpen: false,
      };
    case NEW_INGREDIENT_IN_ORDER:
      if (action.ingredient.type === "bun") {
        return {
          ...state,
          order: {
            ...state.order,
            bun: action.ingredient,
          },
        };
      }
      return {
        ...state,
        order: {
          ...state.order,
          fillings: [
            ...state.order.fillings,
            { id: state.order.nextFillingId, ingredient: action.ingredient },
          ],
          nextFillingId: state.order.nextFillingId + 1,
        },
      };
    case DELETED_FILLING_IN_ORDER:
      return {
        ...state,
        order: {
          ...state.order,
          fillings: state.order.fillings.filter(
            (x) => x.id !== action.filling.id
          ),
        },
      };
    case FILLING_MOVED:
      const movedFillingIndex = state.order.fillings.findIndex(
        (x) => x.id === action.movedFilling.id
      );
      const nearestOtherFillingIndex = state.order.fillings.findIndex(
        (x) => x.id === action.nearestOtherFilling.id
      );

      return {
        ...state,
        order: {
          ...state.order,
          fillings:
            movedFillingIndex > nearestOtherFillingIndex
              ? state.order.fillings
                  .filter((x) => x.id !== action.movedFilling.id)
                  .toSpliced(
                    nearestOtherFillingIndex,
                    1,
                    action.movedFilling,
                    action.nearestOtherFilling
                  )
              : state.order.fillings
                  .filter((x) => x.id !== action.movedFilling.id)
                  .toSpliced(
                    nearestOtherFillingIndex - 1,
                    1,
                    action.nearestOtherFilling,
                    action.movedFilling
                  ),
        },
      };
    default:
      return state;
  }
}

export { rootReducer };

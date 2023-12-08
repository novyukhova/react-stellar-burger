import {
  ORDER_ACCEPTED,
  ORDER_DETAILS_CLOSED,
  NEW_INGREDIENT_IN_ORDER,
  DELETED_FILLING_IN_ORDER,
  FILLING_MOVED,
} from "../actions/order";

const initialState = {
  orderDetailsIsOpen: false,
  bun: null,
  fillings: [],
  nextFillingId: 1,
  id: null,
};

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER_ACCEPTED:
      return {
        ...state,
        orderDetailsIsOpen: true,
        id: action.orderId,
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
          bun: action.ingredient,
        };
      }
      return {
        ...state,
        fillings: [
          ...state.fillings,
          { id: state.nextFillingId, ingredient: action.ingredient },
        ],
        nextFillingId: state.nextFillingId + 1,
      };
    case DELETED_FILLING_IN_ORDER:
      return {
        ...state,
        fillings: state.fillings.filter((x) => x.id !== action.filling.id),
      };
    case FILLING_MOVED:
      const movedFillingIndex = state.fillings.findIndex(
        (x) => x.id === action.movedFilling.id
      );
      const nearestOtherFillingIndex = state.fillings.findIndex(
        (x) => x.id === action.nearestOtherFilling.id
      );

      return {
        ...state,
        fillings:
          movedFillingIndex > nearestOtherFillingIndex
            ? state.fillings
                .filter((x) => x.id !== action.movedFilling.id)
                .toSpliced(
                  nearestOtherFillingIndex,
                  1,
                  action.movedFilling,
                  action.nearestOtherFilling
                )
            : state.fillings
                .filter((x) => x.id !== action.movedFilling.id)
                .toSpliced(
                  nearestOtherFillingIndex - 1,
                  1,
                  action.nearestOtherFilling,
                  action.movedFilling
                ),
      };
    default:
      return state;
  }
}

export { orderReducer };

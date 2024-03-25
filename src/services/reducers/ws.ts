import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../constants/ws";
import type { TWSActions } from "../actions/ws";
import { TOrdersMessage } from "../types/data";

type TWSState = {
  wsConnected: boolean;
  lastOrdersMessage: TOrdersMessage | null;

  error?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
  lastOrdersMessage: null,
};
function wsReducer(
  state: TWSState = initialState,
  action: TWSActions
): TWSState {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      const parsedMessage = JSON.parse(action.payload);
      return {
        ...state,
        lastOrdersMessage: parsedMessage,
      };
    default:
      return state;
  }
}

export { wsReducer, initialState };

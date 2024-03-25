import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_END,
} from "../constants/ws";

type TWSConnectionStartAction = {
  type: typeof WS_CONNECTION_START;
  payload: string;
};

type TWSConnectionEndAction = {
  type: typeof WS_CONNECTION_END;
};

type TWSConnectionSuccessAction = {
  type: typeof WS_CONNECTION_SUCCESS;
};

type TWSConnectionErrorAction = {
  type: typeof WS_CONNECTION_ERROR;
};

type TWSConnectionClosedAction = {
  type: typeof WS_CONNECTION_CLOSED;
};

type TWSGetMessageAction = {
  type: typeof WS_GET_MESSAGE;
  payload: string;
};

type TWSSendMessageAction = {
  type: typeof WS_SEND_MESSAGE;
  payload: string;
};

export type TWSActions =
  | TWSConnectionStartAction
  | TWSConnectionEndAction
  | TWSConnectionSuccessAction
  | TWSConnectionErrorAction
  | TWSConnectionClosedAction
  | TWSGetMessageAction
  | TWSSendMessageAction;

export function wsConnectionStart(url: string): TWSConnectionStartAction {
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
}

export function wsConnectionEnd(): TWSConnectionEndAction {
  return {
    type: WS_CONNECTION_END,
  };
}

export function wsConnectionSuccess(): TWSConnectionSuccessAction {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
}

export function wsConnectionError(): TWSConnectionErrorAction {
  return {
    type: WS_CONNECTION_ERROR,
  };
}

export function wsConnectionClosed(): TWSConnectionClosedAction {
  return {
    type: WS_CONNECTION_CLOSED,
  };
}

export function wsGetMessage(message: string): TWSGetMessageAction {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
}

export function wsSendMessage(message: string): TWSSendMessageAction {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
}

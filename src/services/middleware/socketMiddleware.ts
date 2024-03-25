import type { Middleware, MiddlewareAPI } from "redux";

import type { TApplicationAction, AppDispatch, TCommonState } from "../types";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_END,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../constants/ws";

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, TCommonState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TApplicationAction) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(action.payload);
      }

      if (type === WS_CONNECTION_END && socket) {
        socket.close();
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: WS_GET_MESSAGE, payload: data });
        };

        socket.onclose = (event) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_SEND_MESSAGE) {
          const message = action.payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};

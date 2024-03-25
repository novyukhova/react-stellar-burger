import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetMessage,
} from "../actions/ws";
import { wsReducer, initialState } from "./ws";

describe("wsReducer", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should set wsConnected true on wsConnectionSuccess", () => {
    expect(wsReducer(initialState, wsConnectionSuccess())).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });

  it("should set wsConnected false on wsConnectionError", () => {
    expect(
      wsReducer(
        {
          ...initialState,
          wsConnected: true,
        },
        wsConnectionError()
      )
    ).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it("should set wsConnected false on wsConnectionClosed", () => {
    expect(
      wsReducer(
        {
          ...initialState,
          wsConnected: true,
        },
        wsConnectionClosed()
      )
    ).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it("should set lastOrdersMessage on wsGetMessage", () => {
    const payload = JSON.stringify({ message: "message" });

    expect(
      wsReducer(
        {
          ...initialState,
          wsConnected: true,
          lastOrdersMessage: null,
        },
        wsGetMessage(payload)
      )
    ).toEqual({
      ...initialState,
      wsConnected: true,
      lastOrdersMessage: { message: "message" },
    });
  });
});

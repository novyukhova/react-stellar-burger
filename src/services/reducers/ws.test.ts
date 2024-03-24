import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetMessage,
} from "../actions/ws";
import { wsReducer } from "./ws";

describe("wsReducer", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, {} as any)).toEqual({
      wsConnected: false,
      lastOrdersMessage: null,
    });
  });

  it("should set wsConnected true on wsConnectionSuccess", () => {
    expect(
      wsReducer(
        {
          wsConnected: false,
          lastOrdersMessage: null,
        },
        wsConnectionSuccess()
      )
    ).toEqual({
      wsConnected: true,
      lastOrdersMessage: null,
    });
  });

  it("should set wsConnected false on wsConnectionError", () => {
    expect(
      wsReducer(
        {
          wsConnected: true,
          lastOrdersMessage: null,
        },
        wsConnectionError()
      )
    ).toEqual({
      wsConnected: false,
      lastOrdersMessage: null,
    });
  });

  it("should set wsConnected false on wsConnectionClosed", () => {
    expect(
      wsReducer(
        {
          wsConnected: true,
          lastOrdersMessage: null,
        },
        wsConnectionClosed()
      )
    ).toEqual({
      wsConnected: false,
      lastOrdersMessage: null,
    });
  });

  it("should set lastOrdersMessage on wsGetMessage", () => {
    const payload = JSON.stringify({ message: "message" });

    expect(
      wsReducer(
        {
          wsConnected: true,
          lastOrdersMessage: null,
        },
        wsGetMessage(payload)
      )
    ).toEqual({
      wsConnected: true,
      lastOrdersMessage: { message: "message" },
    });
  });
});

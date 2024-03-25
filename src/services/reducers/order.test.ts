import {
  deletedFillingInOrder,
  fillingMoved,
  newIngredientInOrder,
  orderAccepted,
  orderDetailsClosed,
} from "../actions";
import { orderReducer, initialState } from "./order";

const bun = {
  _id: "1",
  name: "Краторная булка",
  type: "bun",
  proteins: 10,
  fat: 20,
  carbohydrates: 30,
  calories: 40,
  price: 500,
  image: "image",
  image_mobile: "image_mobile",
  image_large: "image_large",
};

const fillingIngredient = {
  _id: "2",
  name: "Соус",
  type: "filling",
  proteins: 10,
  fat: 20,
  carbohydrates: 30,
  calories: 40,
  price: 500,
  image: "image",
  image_mobile: "image_mobile",
  image_large: "image_large",
};

describe("orderReducer", () => {
  const order = {
    ingredients: [],
    _id: "1",
    status: "done",
    name: "name",
    number: 1,
    price: 100,
  };

  it("should return the initial state", () => {
    expect(orderReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should set orderDetailsIsOpen true and currentOrder to current order on orderAccepted", () => {
    expect(orderReducer(initialState, orderAccepted(order))).toEqual({
      ...initialState,
      orderDetailsIsOpen: true,
      createdOrder: order,
    });
  });

  it("should remove fillings on orderAccepted", () => {
    expect(
      orderReducer(
        {
          ...initialState,
          bun: bun,
          fillings: [{ id: 1, ingredient: fillingIngredient }],
          nextFillingId: 2,
        },
        orderAccepted(order)
      )
    ).toEqual({
      ...initialState,
      orderDetailsIsOpen: true,
      createdOrder: order,
      bun: bun,
      fillings: [],
      nextFillingId: 1,
    });
  });

  it("should set orderDetailsIsOpen false on orderDetailsClosed", () => {
    expect(
      orderReducer(
        {
          ...initialState,
          orderDetailsIsOpen: true,
          createdOrder: order,
        },
        orderDetailsClosed()
      )
    ).toEqual({
      ...initialState,
      orderDetailsIsOpen: false,
      createdOrder: order,
    });
  });

  it("should set bun on newIngredientInOrder if ingredient is bun", () => {
    expect(orderReducer(initialState, newIngredientInOrder(bun))).toEqual({
      ...initialState,
      bun: bun,
    });
  });

  it("should add new filling on newIngredientInOrder if ingredient is not bun", () => {
    expect(
      orderReducer(initialState, newIngredientInOrder(fillingIngredient))
    ).toEqual({
      ...initialState,
      bun: null,
      fillings: [{ id: 1, ingredient: fillingIngredient }],
      nextFillingId: 2,
    });
  });

  it("should remove filling on deletedFillingInOrder", () => {
    expect(
      orderReducer(
        {
          ...initialState,
          fillings: [{ id: 1, ingredient: fillingIngredient }],
          nextFillingId: 2,
        },
        deletedFillingInOrder({
          id: 1,
          ingredient: fillingIngredient,
        })
      )
    ).toEqual({
      ...initialState,
      fillings: [],
      nextFillingId: 2,
    });
  });

  it("should move filling on fillingMoved", () => {
    const anotherFillingIngredient = {
      ...fillingIngredient,
      _id: "3",
      name: "Соус 2",
    };

    expect(
      orderReducer(
        {
          ...initialState,
          fillings: [
            { id: 1, ingredient: fillingIngredient },
            { id: 2, ingredient: anotherFillingIngredient },
          ],
          nextFillingId: 3,
        },
        fillingMoved(
          {
            id: 2,
            ingredient: anotherFillingIngredient,
          },
          { id: 1, ingredient: fillingIngredient }
        )
      )
    ).toEqual({
      ...initialState,
      fillings: [
        { id: 2, ingredient: anotherFillingIngredient },
        { id: 1, ingredient: fillingIngredient },
      ],
      nextFillingId: 3,
    });
  });
});

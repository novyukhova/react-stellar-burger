import {
  deletedFillingInOrder,
  fillingMoved,
  newIngredientInOrder,
  orderAccepted,
  orderDetailsClosed,
} from "../actions";
import { orderReducer } from "./order";

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
    expect(orderReducer(undefined, {} as any)).toEqual({
      orderDetailsIsOpen: false,
      bun: null,
      fillings: [],
      nextFillingId: 1,
      createdOrder: null,
    });
  });

  it("should set orderDetailsIsOpen true and currentOrder to current order on orderAccepted", () => {
    expect(
      orderReducer(
        {
          orderDetailsIsOpen: false,
          bun: null,
          fillings: [],
          nextFillingId: 1,
          createdOrder: null,
        },
        orderAccepted(order)
      )
    ).toEqual({
      orderDetailsIsOpen: true,
      bun: null,
      fillings: [],
      nextFillingId: 1,
      createdOrder: order,
    });
  });

  it("should set orderDetailsIsOpen false on orderDetailsClosed", () => {
    expect(
      orderReducer(
        {
          orderDetailsIsOpen: true,
          bun: null,
          fillings: [],
          nextFillingId: 1,
          createdOrder: order,
        },
        orderDetailsClosed()
      )
    ).toEqual({
      orderDetailsIsOpen: false,
      bun: null,
      fillings: [],
      nextFillingId: 1,
      createdOrder: order,
    });
  });

  it("should set bun on newIngredientInOrder if ingredient is bun", () => {
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

    expect(
      orderReducer(
        {
          orderDetailsIsOpen: false,
          bun: null,
          fillings: [],
          nextFillingId: 1,
          createdOrder: null,
        },
        newIngredientInOrder(bun)
      )
    ).toEqual({
      orderDetailsIsOpen: false,
      bun: bun,
      fillings: [],
      nextFillingId: 1,
      createdOrder: null,
    });
  });

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

  it("should add new filling on newIngredientInOrder if ingredient is not bun", () => {
    expect(
      orderReducer(
        {
          orderDetailsIsOpen: false,
          bun: null,
          fillings: [],
          nextFillingId: 1,
          createdOrder: null,
        },
        newIngredientInOrder(fillingIngredient)
      )
    ).toEqual({
      orderDetailsIsOpen: false,
      bun: null,
      fillings: [{ id: 1, ingredient: fillingIngredient }],
      nextFillingId: 2,
      createdOrder: null,
    });
  });

  it("should remove filling on deletedFillingInOrder", () => {
    expect(
      orderReducer(
        {
          orderDetailsIsOpen: false,
          bun: null,
          fillings: [{ id: 1, ingredient: fillingIngredient }],
          nextFillingId: 2,
          createdOrder: null,
        },
        deletedFillingInOrder({
          id: 1,
          ingredient: fillingIngredient,
        })
      )
    ).toEqual({
      orderDetailsIsOpen: false,
      bun: null,
      fillings: [],
      nextFillingId: 2,
      createdOrder: null,
    });
  });

  it("should move filling on fillingMoved", () => {
    const anotherFillingIngredient = {
      _id: "3",
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

    expect(
      orderReducer(
        {
          orderDetailsIsOpen: false,
          bun: null,
          fillings: [
            { id: 1, ingredient: fillingIngredient },
            { id: 2, ingredient: anotherFillingIngredient },
          ],
          nextFillingId: 3,
          createdOrder: null,
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
      orderDetailsIsOpen: false,
      bun: null,
      fillings: [
        { id: 2, ingredient: anotherFillingIngredient },
        { id: 1, ingredient: fillingIngredient },
      ],
      nextFillingId: 3,
      createdOrder: null,
    });
  });
});

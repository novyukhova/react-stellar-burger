import { ingredientsLoaded } from "../actions";
import { ingredientsReducer, initialState } from "./ingredients";

const ingredient = {
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

describe("initialState", () => {
  it("should have no ingredients", () => {
    expect(initialState).toEqual({
      allIngredients: [],
    });
  });
});

describe("ingredientsReducer", () => {
  it("should return the initial state", () => {
    expect(ingredientsReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should set allIngredients on ingredientsLoaded", () => {
    expect(
      ingredientsReducer(initialState, ingredientsLoaded([ingredient]))
    ).toEqual({
      allIngredients: [ingredient],
    });
  });
});

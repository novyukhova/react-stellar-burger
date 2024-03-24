import { ingredientsLoaded } from "../actions";
import { ingredientsReducer } from "./ingredients";

describe("ingredientsReducer", () => {
  it("should return the initial state", () => {
    expect(ingredientsReducer(undefined, {} as any)).toEqual({
      allIngredients: [],
    });
  });

  it("should set allIngredients on INGREDIENTS_LOADED", () => {
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

    expect(
      ingredientsReducer(
        {
          allIngredients: [],
        },
        ingredientsLoaded([ingredient])
      )
    ).toEqual({
      allIngredients: [ingredient],
    });
  });
});

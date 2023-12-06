import { ingredientPropType } from "../../utils/prop-types";

function IngredientDetails({ ingredient }) {
  const nutritionFacts = [
    { name: "Калории,ккал", value: ingredient.calories },
    { name: "Белки, г", value: ingredient.proteins },
    { name: "Жиры, г", value: ingredient.fat },
    { name: "Углеводы, г", value: ingredient.carbohydrates },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className="pb-4 pr-5 pl-5"
      />
      <h3
        className="pb-8 text text_type_main-medium"
        style={{
          margin: 0,
        }}
      >
        {ingredient.name}
      </h3>
      <ul
        style={{
          listStyle: "none",
          paddingLeft: 0,
          display: "flex",
          gap: "20px",
          color: "#8585AD",
        }}
        className="text text_type_main-default pb-5"
      >
        {nutritionFacts.map((fact) => (
          <li key={fact.name} style={{ textAlign: "center" }}>
            <p style={{ margin: 0 }}>{fact.name}</p>
            <p style={{ margin: 0 }} className="text text_type_digits-default">
              {fact.value}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientPropType,
};

export { IngredientDetails };

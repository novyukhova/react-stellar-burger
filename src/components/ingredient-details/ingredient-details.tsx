import { TIngredient } from "../../utils/api";
import styles from "./ingredient-details.module.css";

function IngredientDetails({ ingredient }: { ingredient: TIngredient }) {
  const nutritionFacts = [
    { name: "Калории,ккал", value: ingredient.calories },
    { name: "Белки, г", value: ingredient.proteins },
    { name: "Жиры, г", value: ingredient.fat },
    { name: "Углеводы, г", value: ingredient.carbohydrates },
  ];
  return (
    <div className={styles.details}>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className="pb-4 pr-5 pl-5"
      />
      <h3 className={`${styles.text} pb-8 text text_type_main-medium`}>
        {ingredient.name}
      </h3>
      <ul
        className={`${styles["nutrition-facts"]} text text_type_main-default text_color_inactive pb-5`}
      >
        {nutritionFacts.map((fact) => (
          <li key={fact.name} className={styles["nutrition-fact"]}>
            <p className={styles.text}>{fact.name}</p>
            <p className={`${styles.text} text text_type_digits-default`}>
              {fact.value}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { IngredientDetails };

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import styles from "./ingredients.module.css";
import { TCommonState } from "../utils/types";

function IngredientPage() {
  const { id } = useParams();
  const { allIngredients } = useSelector((x: TCommonState) => x.ingredients);
  const currentIngredient = allIngredients.find((x) => x._id === id);

  return (
    <>
      <h1 className={`text text_type_main-medium ${styles.h1}`}>
        Детали ингредиента
      </h1>
      {currentIngredient && (
        <IngredientDetails ingredient={currentIngredient} />
      )}
    </>
  );
}

export { IngredientPage };

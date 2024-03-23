import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadIngredients,
  currentIngredientChanged,
} from "../services/actions/ingredients";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import styles from "./ingredients.module.css";

function IngredientPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allIngredients, currentIngredient } = useSelector(
    (x) => x.ingredients
  );
  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);
  useEffect(() => {
    const ingredient = allIngredients.find((x) => x._id === id);
    if (ingredient) {
      dispatch(currentIngredientChanged(ingredient));
    }
  }, [allIngredients, id, dispatch]);

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

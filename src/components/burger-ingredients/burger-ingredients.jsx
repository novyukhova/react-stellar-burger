import { useState } from "react";
import { createPortal } from "react-dom";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import { useDispatch, useSelector } from "react-redux";
import { currentIngredientChanged } from "../../services/actions";
import { useDrag } from "react-dnd";

const ingredientTypes = [
  { id: "bun", name: "Булки" },
  { id: "sauce", name: "Соусы" },
  { id: "main", name: "Начинки" },
];

function BurgerIngredients({ ingredients }) {
  const [type, setType] = useState("bun");
  const currentIngredient = useSelector((x) => x.currentIngredient);
  const dispatch = useDispatch();

  return (
    <>
      <div className={`${styles.tabs} pb-10`}>
        {ingredientTypes.map((x) => (
          <Tab value={x.id} active={type === x.id} onClick={setType} key={x.id}>
            {x.name}
          </Tab>
        ))}
      </div>
      <div className={`${styles.ingredients} custom-scroll`}>
        {ingredientTypes.map((x) => (
          <div key={x.id}>
            <h2 className="text text_type_main-medium pb-6">{x.name}</h2>
            <ul className={`${styles["ingredient-list"]} pl-4 pb-10`}>
              {ingredients
                .filter((ingredient) => ingredient.type === x.id)
                .map((ingredient) => (
                  <BurgerIngredient
                    key={ingredient._id}
                    ingredient={ingredient}
                  />
                ))}
            </ul>
          </div>
        ))}
      </div>
      {currentIngredient &&
        createPortal(
          <Modal
            onClose={() => dispatch(currentIngredientChanged(null))}
            title="Детали ингредиента"
          >
            <IngredientDetails ingredient={currentIngredient} />
          </Modal>,
          document.body
        )}
    </>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType),
};

function BurgerIngredient({ ingredient }) {
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <li
      className={styles["ingredient-list__item"]}
      onClick={() => dispatch(currentIngredientChanged(ingredient))}
      ref={dragRef}
    >
      <Counter count={1} size="default" />
      <img src={ingredient.image} alt={ingredient.name} className="pl-4 pr-4" />
      <p className={`${styles.price} pt-1`}>
        <span className="text text_type_digits-default pr-1">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default pt-1">{ingredient.name}</p>
    </li>
  );
}

export { BurgerIngredients };

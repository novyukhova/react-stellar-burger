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

const ingredientTypes = [
  { id: "bun", name: "Булки" },
  { id: "sauce", name: "Соусы" },
  { id: "main", name: "Начинки" },
];

function BurgerIngredients({ ingredients }) {
  const [type, setType] = useState("bun");
  const [currentIngredient, setCurrentIngredient] = useState(null);
  return (
    <>
      <div style={{ display: "flex" }} className="pb-10">
        {ingredientTypes.map((x) => (
          <Tab value={x.id} active={type === x.id} onClick={setType} key={x.id}>
            {x.name}
          </Tab>
        ))}
      </div>
      <div
        style={{ maxHeight: "664px", overflow: "auto" }}
        className="custom-scroll"
      >
        {ingredientTypes.map((x) => (
          <div key={x.id}>
            <h2 className="text text_type_main-medium pb-6">{x.name}</h2>
            <ul
              style={{
                listStyle: "none",
                margin: "0",
                display: "grid",
                gridTemplateColumns: "repeat(2,272px)",
                gridTemplateRows: "repeat(auto-fit,208px)",
                justifyContent: "center",
                rowGap: "32px",
                columnGap: "24px",
              }}
              className="pl-4 pb-10"
            >
              {ingredients
                .filter((ingredient) => ingredient.type === x.id)
                .map((ingredient) => (
                  <li
                    key={ingredient._id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                    }}
                    onClick={() => setCurrentIngredient(ingredient)}
                  >
                    <Counter count={1} size="default" />
                    <img
                      src={ingredient.image}
                      alt={ingredient.name}
                      className="pl-4 pr-4"
                    />
                    <span
                      className="pt-1"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <p
                        className="text text_type_digits-default pr-1"
                        style={{ display: "inline" }}
                      >
                        {ingredient.price}
                      </p>
                      <CurrencyIcon type="primary" />
                    </span>
                    <p
                      className="text text_type_main-default pt-1"
                      style={{ textAlign: "center" }}
                    >
                      {ingredient.name}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      {currentIngredient &&
        createPortal(
          <Modal
            onClose={() => setCurrentIngredient(null)}
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

export { BurgerIngredients };

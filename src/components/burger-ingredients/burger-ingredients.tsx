import { useState, useMemo, useRef } from "react";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import styles from "./burger-ingredients.module.css";
import { useDispatch, useSelector } from "react-redux";
import { currentIngredientChanged } from "../../services/actions";
import { useDrag } from "react-dnd";
import { TCommonState } from "../../utils/types";
import { TIngredient } from "../../utils/api";

const ingredientTypes = [
  { id: "bun", name: "Булки" },
  { id: "sauce", name: "Соусы" },
  { id: "main", name: "Начинки" },
];

function BurgerIngredients() {
  const ingredients = useSelector(
    (store: TCommonState) => store.ingredients.allIngredients
  );
  const [type, setType] = useState("bun");
  const currentIngredient = useSelector(
    (x: TCommonState) => x.ingredients.currentIngredient
  );
  const dispatch = useDispatch();
  const orderedBun = useSelector((x: TCommonState) => x.order.bun);
  const orderedFillings = useSelector((x: TCommonState) => x.order.fillings);
  const typesRef = useRef<Record<string, HTMLElement>>({});
  const fillingCountsByIngredientId = useMemo(
    () =>
      orderedFillings.reduce((c: Record<string, number>, f) => {
        if (c[f.ingredient._id]) {
          c[f.ingredient._id]++;
        } else {
          c[f.ingredient._id] = 1;
        }
        return c;
      }, {}),
    [orderedFillings]
  );

  return (
    <>
      <div className={`${styles.tabs} pb-10`}>
        {ingredientTypes.map((x) => (
          <Tab
            value={x.id}
            active={type === x.id}
            key={x.id}
            onClick={() => {}}
          >
            {x.name}
          </Tab>
        ))}
      </div>
      <div
        className={`${styles.ingredients} custom-scroll`}
        onScroll={(event) => {
          setType(
            ingredientTypes
              .map((x) => ({
                type: x.id,
                offsetTop: typesRef.current[x.id].offsetTop,
              }))
              .filter((x) => x.offsetTop <= event.currentTarget.scrollTop)
              .toSorted((a, b) => b.offsetTop - a.offsetTop)[0].type
          );
        }}
      >
        {ingredientTypes.map((x) => (
          <div key={x.id} ref={(el) => (typesRef.current[x.id] = el!)}>
            <h2 className="text text_type_main-medium pb-6">{x.name}</h2>
            <ul className={`${styles["ingredient-list"]} pl-4 pb-10`}>
              {ingredients
                .filter((ingredient) => ingredient.type === x.id)
                .map((ingredient) => (
                  <BurgerIngredient
                    key={ingredient._id}
                    ingredient={ingredient}
                    count={
                      ingredient.type === "bun"
                        ? orderedBun && orderedBun._id === ingredient._id
                          ? 1
                          : 0
                        : fillingCountsByIngredientId[ingredient._id]
                    }
                  />
                ))}
            </ul>
          </div>
        ))}
      </div>
      {currentIngredient && (
        <Modal
          onClose={() => {
            window.history.back();
            dispatch(currentIngredientChanged(null));
          }}
          title="Детали ингредиента"
        >
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </>
  );
}

function BurgerIngredient({
  ingredient,
  count,
}: {
  ingredient: TIngredient;
  count: number;
}) {
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <li
      className={styles["ingredient-list__item"]}
      onClick={() => {
        window.history.pushState({}, "", `/ingredients/${ingredient._id}`);
        dispatch(currentIngredientChanged(ingredient));
      }}
      ref={dragRef}
    >
      {count > 0 && <Counter count={count} size="default" />}
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

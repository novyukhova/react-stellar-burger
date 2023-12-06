import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { useState } from "react";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";

function BurgerConstructor({ bun, ingredients }) {
  const [orderDetailsIsOpen, setOrderDetailsIsOpen] = useState(false);
  return (
    <>
      <ul className={`${styles["ingredient-list"]} pt-25 pl-4 pb-10`}>
        {bun && (
          <li className="pl-8 pl-4 pr-4">
            <ConstructorElement
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image_mobile}
              type="top"
              isLocked={true}
            />
          </li>
        )}
        <li className={`${styles["ingredient-list__filling"]} custom-scroll`}>
          <ul className={styles["filling-list"]}>
            {ingredients.map((ingredient) => (
              <li
                className={`${styles["filling-list__item"]} pr-4`}
                key={ingredient._id}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image_mobile}
                />
              </li>
            ))}
          </ul>
        </li>
        {bun && (
          <li className="pl-8">
            <ConstructorElement
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image_mobile}
              type="bottom"
              isLocked={true}
            />
          </li>
        )}
      </ul>
      <div className={`${styles["order-info"]} pr-4`}>
        <div className={`${styles.price} pr-10`}>
          <p className="text text_type_digits-medium pr-1">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => setOrderDetailsIsOpen(true)}
        >
          Оформить заказ
        </Button>
      </div>
      {orderDetailsIsOpen &&
        createPortal(
          <Modal onClose={() => setOrderDetailsIsOpen(false)}>
            <OrderDetails id="034536" />
          </Modal>,
          document.body
        )}
    </>
  );
}

BurgerConstructor.propTypes = {
  bun: ingredientPropType,
  ingredients: PropTypes.arrayOf(ingredientPropType),
};

export { BurgerConstructor };

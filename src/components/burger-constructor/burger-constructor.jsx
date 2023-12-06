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

function BurgerConstructor({ bun, ingredients }) {
  const [orderDetailsIsOpen, setOrderDetailsIsOpen] = useState(false);
  return (
    <>
      <ul
        style={{
          listStyle: "none",
          margin: "0",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
        className="pt-25 pl-4 pb-10"
      >
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
        <li
          style={{
            maxHeight: "calc(100vh - 88px - 196px - 252px)",
            overflow: "auto",
          }}
          className="custom-scroll"
        >
          <ul
            style={{
              listStyle: "none",
              margin: "0",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              padding: "0",
            }}
          >
            {ingredients.map((ingredient) => (
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                className="pr-4"
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
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
        className="pr-4"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
          className="pr-10"
        >
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

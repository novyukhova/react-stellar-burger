import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import {
  orderAccepted,
  orderDetailsClosed,
  newIngredientInOrder,
  deletedFillingInOrder,
  fillingMoved,
} from "../../services/actions";
import { useSelector, useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

function BurgerConstructor() {
  const orderDetailsIsOpen = useSelector((x) => x.orderDetailsIsOpen);
  const bun = useSelector((x) => x.order.bun);
  const fillings = useSelector((x) => x.order.fillings);
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(x, monitor) {
      if (monitor.getItemType() === "ingredient") {
        dispatch(newIngredientInOrder(x));
      } else {
        console.log(x);
      }
    },
  });

  return (
    <>
      <ul
        className={`${styles["ingredient-list"]} pt-25 pl-4 pb-10`}
        ref={dropTarget}
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
        <li className={`${styles["ingredient-list__filling"]} custom-scroll`}>
          <ul className={styles["filling-list"]}>
            {fillings.map((filling) => (
              <BurgerFilling filling={filling} key={filling.id} />
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
          onClick={() => dispatch(orderAccepted("034536"))}
        >
          Оформить заказ
        </Button>
      </div>
      {orderDetailsIsOpen &&
        createPortal(
          <Modal onClose={() => dispatch(orderDetailsClosed())}>
            <OrderDetails id="034536" />
          </Modal>,
          document.body
        )}
    </>
  );
}

function BurgerFilling({ filling }) {
  const dispatch = useDispatch();
  const ingredient = filling.ingredient;
  const ref = useRef(null);

  const [{ isDrag }, dragRef] = useDrag({
    type: "filling",
    item: filling,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropTarget] = useDrop({
    accept: "filling",
    drop(x) {
      if (x.id === filling.id) return;
      dispatch(fillingMoved(x, filling));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  dragRef(dropTarget(ref));

  return (
    <li
      className={`${styles["filling-list__item"]} pr-4`}
      style={{ opacity: isDrag ? 0 : 1 }}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        handleClose={() => dispatch(deletedFillingInOrder(filling))}
      />
    </li>
  );
}

export { BurgerConstructor };

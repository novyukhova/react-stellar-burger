import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import {
  orderDetailsClosed,
  newIngredientInOrder,
  deletedFillingInOrder,
  fillingMoved,
  createOrder,
} from "../../services/actions";
import { useSelector, useDispatch } from "../../services/hooks";
import { useDrag, useDrop } from "react-dnd";
import { useRef, useMemo } from "react";
import type { TFilling } from "../../services/types/data";
import { TIngredient } from "../../utils/api";

function BurgerConstructor() {
  const orderDetailsIsOpen = useSelector((x) => x.order.orderDetailsIsOpen);
  const bun = useSelector((x) => x.order.bun);
  const fillings = useSelector((x) => x.order.fillings);
  const dispatch = useDispatch();
  const ingredientsId = (bun ? [bun._id] : []).concat(
    fillings.map((x) => x.ingredient._id)
  );
  const orderId = useSelector((x) => x.order.createdOrder?.number);

  const totalPrice = useMemo(
    () =>
      2 * (bun?.price ?? 0) +
      (!fillings.length
        ? 0
        : fillings.reduce((sum, currentFilling) => {
            return currentFilling.ingredient.price
              ? sum + currentFilling.ingredient.price
              : sum;
          }, 0)),
    [fillings, bun]
  );

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(x: TIngredient, monitor) {
      if (!bun && x.type !== "bun") return;
      if (monitor.getItemType() === "ingredient") {
        dispatch(newIngredientInOrder(x));
      } else {
        console.log(x);
      }
    },
  });

  if (!bun) {
    return (
      <div
        className={`${styles["ingredient-list"]} pt-25 pl-4 pb-25 text text_type_main-default constructor-ingredient-list`}
        ref={dropTarget}
      >
        Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа
      </div>
    );
  }

  return (
    <>
      <ul
        className={`${styles["ingredient-list"]} pt-25 pl-4 pb-10 constructor-ingredient-list`}
        ref={dropTarget}
      >
        <li className="pl-8 pl-4 pr-4">
          <ConstructorElement
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
            type="top"
            isLocked={true}
          />
        </li>
        <li className={`${styles["ingredient-list__filling"]} custom-scroll`}>
          <ul className={styles["filling-list"]}>
            {fillings.map((filling) => (
              <BurgerFilling filling={filling} key={filling.id} />
            ))}
          </ul>
        </li>
        <li className="pl-8">
          <ConstructorElement
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
            type="bottom"
            isLocked={true}
          />
        </li>
      </ul>
      <div className={`${styles["order-info"]} pr-4`}>
        <div className={`${styles.price} pr-10`}>
          <p className="text text_type_digits-medium pr-1">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="order-button"
          onClick={() => dispatch(createOrder(ingredientsId))}
        >
          Оформить заказ
        </Button>
      </div>
      {orderDetailsIsOpen && (
        <Modal onClose={() => dispatch(orderDetailsClosed())}>
          <OrderDetails id={orderId} />
        </Modal>
      )}
    </>
  );
}

function BurgerFilling({ filling }: { filling: TFilling }) {
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
    drop(x: TFilling) {
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

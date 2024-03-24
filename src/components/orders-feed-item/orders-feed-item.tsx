import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { TOrder } from "../../services/types/data";
import { TIngredient } from "../../utils/api";
import styles from "./orders-feed-item.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatTimestamp } from "../../utils/date";

function OrdersFeedItem({ order }: { order: TOrder }) {
  const location = useLocation();
  const navigate = useNavigate();
  const allIngredients = useSelector((x) => x.ingredients.allIngredients);
  const ingredientsById = allIngredients.reduce(
    (acc: Record<string, TIngredient>, item) => {
      acc[item._id] = item;
      return acc;
    },
    {}
  );
  const price = order.ingredients.reduce((acc, id) => {
    return acc + ingredientsById[id].price;
  }, 0);

  return (
    <div
      className={styles.order_card}
      onClick={() =>
        navigate(`${location.pathname}/${order._id}`, {
          state: { background: location },
        })
      }
    >
      <div className={styles.order_info}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {formatTimestamp(order.createdAt)}
        </p>
      </div>
      <h2 className="text text_type_main-medium pb-6">{order.name}</h2>
      <div className={styles.burger_details}>
        <div className={styles.ingredients_list}>
          {order.ingredients.slice(0, 6).map((id) => (
            <div key={id}>
              <div className={styles.imageContainer}>
                <img
                  src={ingredientsById[id].image}
                  alt={ingredientsById[id].name}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <span className="text text_type_digits-default pr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
export { OrdersFeedItem };

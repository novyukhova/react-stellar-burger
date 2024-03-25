import { useSelector } from "../../services/hooks";
import { TIngredient } from "../../utils/api";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-view.module.css";
import { TOrder } from "../../services/types/data";
import { formatTimestamp } from "../../utils/date";

function OrderView({ order }: { order?: TOrder }) {
  const allIngredients = useSelector((x) => x.ingredients.allIngredients);

  if (!order) {
    return null;
  }

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

  const ingregientsGroupedByType: { ingredient: TIngredient; count: number }[] =
    order.ingredients.reduce(
      (acc: { ingredient: TIngredient; count: number }[], id) => {
        const ingredient = ingredientsById[id];
        const existing = acc.find((x) => x.ingredient._id === ingredient._id);
        if (existing) {
          existing.count++;
        } else {
          acc.push({ ingredient, count: 1 });
        }
        return acc;
      },
      []
    );

  return (
    <div className={`mt-10 ${styles.main}`}>
      <div className={`pb-15 ${styles.header_area}`}>
        <h1 className="text text_type_main-large pb-3">{order.name}</h1>
        <p
          className={`text text_type_main-small ${getStatusClass(
            order.status
          )}`}
        >
          {formatStatus(order.status)}
        </p>
      </div>
      <div className={`pb-10 ${styles.ingredients}`}>
        <h2 className="text text_type_main-medium pb-6">Состав:</h2>
        <div className={styles.ingredients_list_container}>
          <ul className={`pr-6 ${styles.ingredients_list}`}>
            {ingregientsGroupedByType.map((group) => (
              <li
                key={group.ingredient._id}
                className={`pb-4 ${styles.ingredient}`}
              >
                <div className={`mr-4 ${styles.image_container}`}>
                  <img
                    src={group.ingredient.image}
                    alt={group.ingredient.name}
                    className={styles.image}
                  />
                </div>
                <p className={`text text_type_main-small mr-4 ${styles.name}`}>
                  {group.ingredient.name}
                </p>
                <p className="text text_type_digits-default pr-2">
                  {group.count} x {group.ingredient.price}
                </p>
                <CurrencyIcon type="primary" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.bottom_area}>
        <p className="text text_type_main-small text_color_inactive">
          {formatTimestamp(order.createdAt)}
        </p>
        <div className={styles.price}>
          <p className="text text_type_digits-default pr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

function formatStatus(status: string): string {
  switch (status) {
    case "cancelled":
      return "Отменён";
    case "pending":
      return "Готовится";
    case "done":
      return "Выполнен";
    default:
      return status;
  }
}

function getStatusClass(status: string): string {
  switch (status) {
    case "done":
      return styles.status_done;
    case "cancelled":
      return styles.status_cancelled;
    default:
      return "";
  }
}

export { OrderView };

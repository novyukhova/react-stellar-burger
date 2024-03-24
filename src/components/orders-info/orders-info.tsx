import { useSelector } from "../../services/hooks";
import styles from "./orders-info.module.css";

function OrdersInfo() {
  const orders = useSelector((x) => x.ws.lastOrdersMessage?.orders || []);
  const readyOrders = orders
    .filter((order) => order.status === "done")
    .slice(0, 20);
  const inProgressOrders = orders
    .filter((order) => order.status === "pending")
    .slice(0, 20);
  const totalOrdersAllTime = useSelector(
    (x) => x.ws.lastOrdersMessage?.total || 0
  );
  const totalOrdersToday = useSelector(
    (x) => x.ws.lastOrdersMessage?.totalToday || 0
  );

  return (
    <div className="text text_type_main-default">
      <div className={styles.orderLists}>
        <div className={styles.finished_orders}>
          <h2 className={styles["order-info__title"]}>Готовы:</h2>
          <ul className={styles.orderList}>
            {readyOrders.map((order) => (
              <li
                key={order._id}
                className="text text_type_digits-default mb-2"
              >
                {order.number}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.unfinished_orders}>
          <h2 className={styles["order-info__title"]}>В работе:</h2>
          <ul className={styles.orderList}>
            {inProgressOrders.map((order) => (
              <li
                key={order._id}
                className="text text_type_digits-default mb-2"
              >
                {order.number}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.summary}>
        <h2>Выполнено за все время:</h2>
        <p className="text text_type_digits-large">{totalOrdersAllTime}</p>
      </div>
      <div className={styles.summary_today}>
        <h2>Выполнено за сегодня:</h2>
        <p className="text text_type_digits-large">{totalOrdersToday}</p>
      </div>
    </div>
  );
}

export { OrdersInfo };

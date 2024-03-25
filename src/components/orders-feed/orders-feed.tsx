import styles from "./orders-feed.module.css";
import { OrdersFeedItem } from "../orders-feed-item/orders-feed-item";
import { useSelector } from "../../services/hooks";

function OrdersFeed() {
  const orders = useSelector((x) => x.ws.lastOrdersMessage?.orders) || [];

  return (
    <div className={styles.feedContainer}>
      <div className={styles.feed}>
        {orders.map((order) => (
          <OrdersFeedItem key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}

export { OrdersFeed };

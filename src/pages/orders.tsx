import { useEffect } from "react";
import { ProfileMenu } from "../components/profile-menu/profile-menu";
import { useDispatch } from "../services/hooks";
import styles from "./orders.module.css";
import { wsConnectionEnd, wsConnectionStart } from "../services/actions/ws";
import { getAccessToken } from "../utils/api";
import { OrdersFeed } from "../components/orders-feed/orders-feed";

function OrdersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    getAccessToken().then((token) => {
      dispatch(
        wsConnectionStart(
          `wss://norma.nomoreparties.space/orders?token=${
            token.split("Bearer ")[1]
          }`
        )
      );
    });
    return () => {
      dispatch(wsConnectionEnd());
    };
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <ProfileMenu description="В этом разделе вы можете просмотреть свою историю заказов" />
      <div>
        <h1 className="text text_type_main-large">История заказов</h1>
        <OrdersFeed />
      </div>
    </div>
  );
}

export { OrdersPage };

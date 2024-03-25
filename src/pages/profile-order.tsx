import { useEffect } from "react";
import { useDispatch, useSelector } from "../services/hooks";
import { OrderView } from "../components/order-view/order-view";
import { wsConnectionEnd, wsConnectionStart } from "../services/actions/ws";
import { getAccessToken } from "../utils/api";
import { useParams } from "react-router-dom";
import styles from "./profile-order.module.css";

function ProfileOrderPage() {
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
      return () => {
        dispatch(wsConnectionEnd());
      };
    });
  }, [dispatch]);

  const { id } = useParams();
  const orders = useSelector((x) => x.ws.lastOrdersMessage?.orders) || [];
  const order = orders.find((x) => x._id === id);

  return (
    <section className={`${styles.page} pt-15`}>
      <h2 className="text text_type_digits-default">#{order?.number}</h2>
      <OrderView order={order} />
    </section>
  );
}

export { ProfileOrderPage };

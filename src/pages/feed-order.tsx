import { useEffect } from "react";
import { OrderView } from "../components/order-view/order-view";
import { wsConnectionEnd, wsConnectionStart } from "../services/actions/ws";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "../services/hooks";
import styles from "./feed-order.module.css";

function FeedOrderPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart("wss://norma.nomoreparties.space/orders/all"));
    return () => {
      dispatch(wsConnectionEnd());
    };
  }, [dispatch]);

  const { id } = useParams();
  const orders = useSelector((x) => x.ws.lastOrdersMessage?.orders) || [];
  const order = orders.find((x) => x._id === id);

  return (
    <>
      <section className={`${styles.page} pt-15`}>
        <h2 className="text text_type_digits-default">#{order?.number}</h2>
        <OrderView order={order} />
      </section>
    </>
  );
}
export { FeedOrderPage };

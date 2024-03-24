import styles from "./feed.module.css";
import { OrdersFeed } from "../components/orders-feed/orders-feed";
import { OrdersInfo } from "../components/orders-info/orders-info";
import { useEffect } from "react";
import { useDispatch } from "../services/hooks";
import { wsConnectionStart } from "../services/actions/ws";

function FeedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart("wss://norma.nomoreparties.space/orders/all"));
  }, [dispatch]);

  return (
    <>
      <main className={styles.main}>
        <h1 className="text text_type_main-large pt-10 pb-5">Лента заказов</h1>
        <div className={styles.columns}>
          <section className="pr-10">
            <OrdersFeed />
          </section>
          <section>
            <OrdersInfo />
          </section>
        </div>
      </main>
    </>
  );
}

export { FeedPage };

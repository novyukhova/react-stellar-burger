import { useEffect } from "react";
import { OrderView } from "../components/order-view/order-view";
import { wsConnectionStart } from "../services/actions/ws";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "../services/hooks";

function FeedOrderPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart("wss://norma.nomoreparties.space/orders/all"));
  }, [dispatch]);

  const { id } = useParams();
  const order = useSelector((x) => x.ws.lastOrdersMessage?.orders || []).find(
    (x) => x._id === id
  );

  return (
    <div>
      <h1>Feed Order</h1>
      <OrderView order={order} />
    </div>
  );
}
export { FeedOrderPage };

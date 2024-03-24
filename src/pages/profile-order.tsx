import { useEffect } from "react";
import { useDispatch, useSelector } from "../services/hooks";
import { OrderView } from "../components/order-view/order-view";
import { wsConnectionStart } from "../services/actions/ws";
import { getAccessToken } from "../utils/api";
import { useParams } from "react-router-dom";

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
    });
  }, [dispatch]);

  const { id } = useParams();
  const order = useSelector((x) => x.ws.lastOrdersMessage?.orders || []).find(
    (x) => x._id === id
  );

  return (
    <div>
      <h1>Profile Order Page</h1>
      <OrderView order={order} />
    </div>
  );
}

export { ProfileOrderPage };

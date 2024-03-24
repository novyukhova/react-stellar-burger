import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Modal } from "../modal/modal";
import { OrderView } from "../order-view/order-view";
import { useSelector } from "../../services/hooks";

function OrderModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;
  const { id } = useParams();
  const orders = useSelector((x) => x.ws.lastOrdersMessage?.orders) || [];
  const order = orders.find((x) => x._id === id);

  return (
    <Modal
      onClose={() => {
        navigate(background || "/");
      }}
      title={order ? `#${order?.number}` : ""}
      smallTitle={true}
    >
      <OrderView order={order} />
    </Modal>
  );
}

export { OrderModal };

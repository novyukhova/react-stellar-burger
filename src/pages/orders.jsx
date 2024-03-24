import { ProfileMenu } from "../components/profile-menu/profile-menu";
import styles from "./orders.module.css";

function OrdersPage() {
  return (
    <div className={styles.page}>
      <ProfileMenu description="В этом разделе вы можете просмотреть свою историю заказов" />

      <h1 className="text text_type_main-large">История заказов</h1>
    </div>
  );
}

export { OrdersPage };

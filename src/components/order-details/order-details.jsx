import doneIcon from "../../images/done_icon.png";
import PropTypes from "prop-types";
import styles from "./order-details.module.css";

function OrderDetails(props) {
  return (
    <div className={styles["order-details"]}>
      <h3 className="text text_type_digits-large pb-8">{props.id}</h3>
      <p className={`${styles.text} text text_type_main-medium pb-15`}>
        идентификатор заказа
      </p>
      <img src={doneIcon} alt="" className={`${styles.icon} pb-15`} />
      <p className={`${styles.text} text text_type_main-default pb-2`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${styles.text} text text_type_main-default text_color_inactive pb-20`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export { OrderDetails };

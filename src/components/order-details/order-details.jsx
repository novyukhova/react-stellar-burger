import doneIcon from "../../images/done_icon.png";
import PropTypes from "prop-types";

function OrderDetails(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "56px",
      }}
    >
      <h3 className="text text_type_digits-large pb-8">{props.id}</h3>
      <p style={{ margin: 0 }} className="text text_type_main-medium pb-15">
        идентификатор заказа
      </p>
      <img
        src={doneIcon}
        alt=""
        className="pb-15"
        style={{ maxWidth: "120px" }}
      />
      <p style={{ margin: 0 }} className="text text_type_main-default pb-2">
        Ваш заказ начали готовить
      </p>
      <p
        style={{ margin: 0, color: "#8585AD" }}
        className="text text_type_main-default pb-20"
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

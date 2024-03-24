import { useNavigate, useParams } from "react-router-dom";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { useSelector } from "../../services/hooks";
import { Modal } from "../modal/modal";

function IngredientModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allIngredients } = useSelector((x) => x.ingredients);
  const currentIngredient = allIngredients.find((x) => x._id === id);
  if (!currentIngredient) {
    return null;
  }
  return (
    <Modal
      onClose={() => {
        navigate("/");
      }}
      title="Детали ингредиента"
    >
      <IngredientDetails ingredient={currentIngredient} />
    </Modal>
  );
}

export { IngredientModal };

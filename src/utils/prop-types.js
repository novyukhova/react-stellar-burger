import PropTypes from "prop-types";
import * as Icons from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

export const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
});

export const menuItemPropType = PropTypes.shape({
  icon: PropTypes.oneOf(Object.keys(Icons)).isRequired,
  isActive: PropTypes.bool,
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
});

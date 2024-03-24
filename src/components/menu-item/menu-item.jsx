import * as Icons from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import styles from "./menu-item.module.css";
import { menuItemPropType } from "../../utils/prop-types";
import { NavLink } from "react-router-dom";

function MenuItem({ item: { icon, href, text } }) {
  const Icon = Icons[icon] || Icons["CloseIcon"];

  return (
    <NavLink to={href} className={styles["menu-item"]}>
      {({ isActive }) => (
        <>
          <Icon type={isActive ? "primary" : "secondary"} />{" "}
          <span
            className={`text text_type_main-default ${
              isActive ? "" : "text_color_inactive"
            }`}
          >
            {text}
          </span>
        </>
      )}
    </NavLink>
  );
}

MenuItem.propTypes = {
  item: menuItemPropType,
};

export { MenuItem };

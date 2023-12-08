import * as Icons from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import styles from "./menu-item.module.css";
import { menuItemPropType } from "../../utils/prop-types";

function MenuItem({ item: { icon, isActive, href, text } }) {
  const Icon = Icons[icon] || Icons["CloseIcon"];

  return (
    <a href={href} className={styles["menu-item"]}>
      <Icon type={isActive ? "primary" : "secondary"} />{" "}
      <span
        className={`text text_type_main-default ${
          isActive ? "" : "text_color_inactive"
        }`}
      >
        {text}
      </span>
    </a>
  );
}

MenuItem.propTypes = {
  item: menuItemPropType,
};

export { MenuItem };

import * as Icons from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import styles from "./menu-item.module.css";
import { NavLink } from "react-router-dom";
import { TMenuItem } from "../../utils/types";

function MenuItem({ item: { icon, href, text } }: { item: TMenuItem }) {
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

export { MenuItem };

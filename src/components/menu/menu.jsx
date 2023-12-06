import { MenuItem } from "../menu-item/menu-item";
import PropTypes from "prop-types";
import { menuItemPropType } from "../../utils/prop-types";

import styles from "./menu.module.css";

function Menu({ align, items }) {
  return (
    <nav className={styles.menu}>
      <ul
        className={
          styles.list +
          (align === "right" ? " " + styles["list_align_right"] : "")
        }
      >
        {items.map((item) => (
          <li key={item.text}>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

Menu.propTypes = {
  align: PropTypes.oneOf(["right", "left"]),
  items: PropTypes.arrayOf(menuItemPropType),
};

export { Menu };

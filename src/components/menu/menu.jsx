import { MenuItem } from "../menu-item/menu-item";
import PropTypes from "prop-types";
import { menuItemPropType } from "../../utils/prop-types";

import style from "./menu.module.css";

function Menu({ align, items }) {
  return (
    <nav className={style.menu}>
      <ul
        className={
          style.list +
          (align === "right" ? " " + style["list_align_right"] : "")
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

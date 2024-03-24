import { MenuItem } from "../menu-item/menu-item";
import { TMenuItem } from "../../utils/types";

import styles from "./menu.module.css";

function Menu({
  align,
  items,
}: {
  align?: "right" | "left";
  items: TMenuItem[];
}) {
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

export { Menu };

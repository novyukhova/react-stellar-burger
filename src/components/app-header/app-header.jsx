// import { Menu };
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { Menu } from "../menu/menu";
import styles from "./app-header.module.css";

const menuItems = [
  [
    {
      href: "#",
      icon: "BurgerIcon",
      isActive: true,
      text: "Конструктор",
    },
    {
      href: "#",
      icon: "ListIcon",
      text: "Лента заказов",
    },
  ],
  [
    {
      href: "#",
      icon: "ProfileIcon",
      text: "Личный кабинет",
    },
  ],
];

function AppHeader() {
  return (
    <header className={styles["app-header"]}>
      <div className={styles["app-header__content"]}>
        <Menu items={menuItems[0]} />
        <Logo />
        <Menu align="right" items={menuItems[1]} />
      </div>
    </header>
  );
}

export { AppHeader };

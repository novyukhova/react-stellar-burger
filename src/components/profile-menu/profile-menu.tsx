import { Link, NavLink } from "react-router-dom";
import styles from "./profile-menu.module.css";
import { logout } from "../../services/actions/auth";
import { useDispatch } from "react-redux";

function ProfileMenu({ description }: { description: string }) {
  const dispatch = useDispatch();
  return (
    <div className={styles.leftColumn}>
      <div className={styles.sideMenu}>
        <NavLink to="/profile" className={styles.active__link} end>
          {({ isActive }) =>
            isActive ? (
              <h1 className="text text_type_main-medium">Профиль</h1>
            ) : (
              <span className="text text_type_main-medium text_color_inactive">
                Профиль
              </span>
            )
          }
        </NavLink>
        <NavLink to="/profile/orders" className={styles.active__link}>
          {({ isActive }) =>
            isActive ? (
              <h1 className="text text_type_main-medium">История заказов</h1>
            ) : (
              <span className="text text_type_main-medium text_color_inactive">
                История заказов
              </span>
            )
          }
        </NavLink>
        <Link
          to="/login"
          className={`text text_type_main-medium text_color_inactive ${styles.link}`}
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
          }}
        >
          Выход
        </Link>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        {description}
      </p>
    </div>
  );
}

export { ProfileMenu };

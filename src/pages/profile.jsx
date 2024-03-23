import {
  PasswordInput,
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loadUser, saveUser } from "../services/actions/profile";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "../services/actions/auth";

function ProfilePage() {
  const user = useSelector((x) => x.profile.user);
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  useEffect(() => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
  }, [user]);

  return (
    <>
      <div className={styles.page}>
        <div className={styles.leftColumn}>
          <div className={styles.sideMenu}>
            <NavLink to="/profile" className={styles.active__link}>
              {({ isActive }) => {
                return isActive ? (
                  <h1 className="text text_type_main-medium">Профиль</h1>
                ) : (
                  <span className="text text_type_main-medium text_color_inactive">
                    Профиль
                  </span>
                );
              }}
            </NavLink>
            <NavLink to="/profile/orders" className={styles.active__link}>
              {({ isActive }) =>
                isActive ? (
                  <h1 className="text text_type_main-medium">
                    История заказов
                  </h1>
                ) : (
                  <span className="text text_type_main-medium text_color_inactive">
                    История заказов
                  </span>
                )
              }
            </NavLink>
            <Link
              className={`text text_type_main-medium text_color_inactive ${styles.link}`}
              onClick={() => dispatch(logout())}
            >
              Выход
            </Link>
          </div>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>

        <div className={styles.information}>
          <form className={styles.form}>
            <Input
              placeholder={"Имя"}
              name={"name"}
              icon={"EditIcon"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              extraClass="pb-6"
            />
            <EmailInput
              name={"email"}
              isIcon={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              extraClass="pb-6"
            />
            <PasswordInput
              name={"password"}
              icon="EditIcon"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              extraClass="pb-6"
            />
            <div className={styles.buttonArea}>
              <Button
                htmlType="button"
                type="secondary"
                size="medium"
                onClick={() => dispatch(saveUser(name, email, password))}
              >
                Отмена
              </Button>
              <Button
                htmlType="button"
                type="primary"
                size="medium"
                onClick={() => dispatch(saveUser(name, email, password))}
              >
                Сохранить
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export { ProfilePage };

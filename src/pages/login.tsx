import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { useEffect, useState } from "react";
import { sendLoginForm } from "../services/actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { loginPageOpened } from "../services/actions";
import { TCommonState } from "../utils/types";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigateHome, isAuthenticated } = useSelector(
    (x: TCommonState) => x.auth
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(loginPageOpened());
  }, [dispatch]);
  const backPath = location.state?.from ?? "/";

  if (navigateHome || isAuthenticated) {
    return <Navigate to={backPath} />;
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(sendLoginForm(email, password));
      }}
    >
      <h1 className="text text_type_main-medium pb-6">Вход</h1>
      <EmailInput
        name={"email"}
        isIcon={false}
        extraClass="pb-6"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <PasswordInput
        name={"password"}
        extraClass="pb-6"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button htmlType="submit" type="primary" size="large">
        Войти
      </Button>
      <p className="text text_type_main-default pt-20">
        Вы — новый пользователь?{" "}
        <a href="/register" className={styles.link}>
          Зарегистрироваться
        </a>
      </p>
      <p className="text text_type_main-default pt-4">
        Забыли пароль?{" "}
        <a href="/forgot-password" className={styles.link}>
          Восстановить пароль
        </a>
      </p>
    </form>
  );
}

export { LoginPage };

import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { useEffect, useState } from "react";
import { sendLoginForm } from "../services/actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginPageOpened } from "../services/actions";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigateHome } = useSelector((x) => x.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginPageOpened());
  }, [dispatch]);

  if (navigateHome) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <form className={styles.form}>
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
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => dispatch(sendLoginForm(email, password))}
        >
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
    </>
  );
}

export { LoginPage };

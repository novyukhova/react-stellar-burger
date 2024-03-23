import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import {
  resetPassword,
  resetPasswordOpened,
} from "../services/actions/reset-password";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const navigateToLogin = useSelector((x) => x.auth.navigateToLogin);
  useEffect(() => {
    dispatch(resetPasswordOpened());
  }, [dispatch]);

  if (location.state?.fromForgotPassword !== true) {
    return <Navigate to="/forgot-password" />;
  }

  if (navigateToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium pb-6">
          Восстановление пароля
        </h1>
        <PasswordInput
          placeholder={"Введите новый пароль"}
          name={"password"}
          extraClass="pb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder={"Введите код из письма"}
          name={"code"}
          extraClass="pb-6"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => dispatch(resetPassword(password, token))}
        >
          Сохранить
        </Button>
        <p className="text text_type_main-default pt-20">
          Вспомнили пароль?{" "}
          <a href="/login" className={styles.link}>
            Войти
          </a>
        </p>
      </form>
    </>
  );
}

export { ResetPasswordPage };

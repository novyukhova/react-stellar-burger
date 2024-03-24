import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { sendResetEmail } from "../services/actions/reset-password";
import { useDispatch, useSelector } from "../services/hooks";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { resetEmailSent } = useSelector((x) => x.resetPassword);

  if (resetEmailSent) {
    return (
      <Navigate to="/reset-password" state={{ fromForgotPassword: true }} />
    );
  }

  return (
    <>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(sendResetEmail(email));
        }}
      >
        <h1 className="text text_type_main-medium pb-6">
          Восстановление пароля
        </h1>
        <EmailInput
          placeholder="Укажите e-mail"
          name={"email"}
          isIcon={false}
          extraClass="pb-6"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button htmlType="submit" type="primary" size="large">
          Восстановить
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

export { ForgotPasswordPage };

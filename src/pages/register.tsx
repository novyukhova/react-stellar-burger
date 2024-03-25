import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "../services/hooks";
import { sendRegisterForm } from "../services/actions/auth";
import { Navigate } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigateHome = useSelector((x) => x.auth.navigateHome);
  if (navigateHome) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(sendRegisterForm(name, email, password));
        }}
      >
        <h1 className="text text_type_main-medium pb-6">Регистрация</h1>
        <Input
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          extraClass="pb-6"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          Зарегистрироваться
        </Button>
        <p className="text text_type_main-default pt-20">
          Уже зарегистрированы?{" "}
          <a href="/login" className={styles.link}>
            Войти
          </a>
        </p>
      </form>
    </>
  );
}

export { RegisterPage };

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
import { ProfileMenu } from "../components/profile-menu/profile-menu";

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
        <ProfileMenu description="В этом разделе вы можете изменить свои персональные данные" />

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

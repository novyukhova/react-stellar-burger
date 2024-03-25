import { useEffect } from "react";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import { useDispatch } from "react-redux";
import { homeOpened } from "../services/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./home.module.css";
import { useSelector } from "../services/hooks";
import { Navigate } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(homeOpened());
  }, [dispatch]);
  const navigateToLogin = useSelector((x) => x.auth.navigateToLogin);
  if (navigateToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.home__main}>
          <section className="pr-10">
            <h1 className="text text_type_main-large pt-10 pb-5">
              Соберите бургер
            </h1>
            <BurgerIngredients />
          </section>
          <section>
            <BurgerConstructor />
          </section>
        </main>
      </DndProvider>
    </>
  );
}

export { HomePage };

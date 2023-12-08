import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { useEffect } from "react";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { loadIngredients } from "../../services/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const ingredients = useSelector((store) => store.allIngredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);
  return (
    <div className={styles.app}>
      <AppHeader />
      <div>
        <DndProvider backend={HTML5Backend}>
          <main className={styles.app__main}>
            <section className="pr-10">
              <h1 className="text text_type_main-large pt-10 pb-5">
                Соберите бургер
              </h1>
              <BurgerIngredients ingredients={ingredients} />
            </section>
            <section>
              <BurgerConstructor />
            </section>
          </main>
        </DndProvider>
      </div>
    </div>
  );
}

export default App;

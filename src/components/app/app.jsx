import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { useEffect, useState } from "react";
import { getIngredients } from "../../utils/api";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

function App() {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    getIngredients()
      .then((x) => setIngredients(x))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
      <div>
        <main className={styles.app__main}>
          <section className="pr-10">
            <h1 className="text text_type_main-large pt-10 pb-5">
              Соберите бургер
            </h1>
            <BurgerIngredients ingredients={ingredients} />
          </section>
          <section>
            <BurgerConstructor
              ingredients={ingredients.filter(
                (ingredient) => ingredient.type !== "bun"
              )}
              bun={ingredients.find((ingredient) => ingredient.type === "bun")}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;

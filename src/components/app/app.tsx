import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HomePage } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password";
import { ProfilePage } from "../../pages/profile";
import { IngredientPage } from "../../pages/ingredients";
import { NotFoundPage } from "../../pages/404";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import { OrdersPage } from "../../pages/orders";
import { useEffect } from "react";
import { loadIngredients } from "../../services/actions";
import { IngredientModal } from "../ingredient-modal/ingredient-modal";
import { FeedPage } from "../../pages/feed";
import { OrderModal } from "../order-modal/order-modal";
import { FeedOrderPage } from "../../pages/feed-order";
import { ProfileOrderPage } from "../../pages/profile-order";
import { useDispatch } from "../../services/hooks";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);
  return (
    <div className={styles.app}>
      <Router>
        <AppHeader />
        <ModalSwitch />
      </Router>
    </div>
  );
}

function ModalSwitch() {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/register"
          element={
            <ProtectedRouteElement
              forbidAuthenticated={true}
              element={<RegisterPage />}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement
              forbidAuthenticated={true}
              element={<ForgotPasswordPage />}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteElement
              forbidAuthenticated={true}
              element={<ResetPasswordPage />}
            />
          }
        />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
        <Route
          path="/profile/orders"
          element={<ProtectedRouteElement element={<OrdersPage />} />}
        />
        <Route path="/ingredients/:id" element={<IngredientPage />} />

        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:id" element={<FeedOrderPage />} />
        <Route
          path="/profile/orders/:id"
          element={<ProtectedRouteElement element={<ProfileOrderPage />} />}
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Routes>
        {background && (
          <>
            <Route path="/ingredients/:id" element={<IngredientModal />} />
            <Route path="/feed/:id" element={<OrderModal />} />
            <Route
              path="/profile/orders/:id"
              element={<ProtectedRouteElement element={<OrderModal />} />}
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;

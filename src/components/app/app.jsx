import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <ProtectedRouteElement
                forbidAuthenticated={true}
                element={<LoginPage />}
              />
            }
          />
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
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

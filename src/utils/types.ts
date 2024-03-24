import type { TIngredient, TUser } from "./api";
import type { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

type TOrderState = {
  orderDetailsIsOpen: boolean;
  bun: TIngredient | null;
  fillings: TFilling[];
  nextFillingId: number;
  createdOrder: any;
};

type TCommonState = {
  order: TOrderState;
  ingredients: TIngredientState;
  auth: TAuthState;
  resetPassword: TResetPasswordState;
  profile: TProfileState;
};

type TProfileState = {
  user: TUser | null;
};

type TResetPasswordState = {
  resetEmailSent: boolean;
};

type TAuthState = {
  isAuthenticated: boolean;
  navigateHome: boolean;
  navigateToLogin: boolean;
};

type TIngredientState = {
  allIngredients: TIngredient[];
  currentIngredient: TIngredient | null;
};

type TFilling = {
  id: number;
  ingredient: TIngredient;
};

type TMenuItem = {
  icon: keyof TICons;
  href: string;
  text: string;
};

export type { TCommonState, TFilling, TMenuItem };

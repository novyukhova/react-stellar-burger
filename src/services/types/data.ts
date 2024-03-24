import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { TIngredient } from "../../utils/api";

type TFilling = {
  id: number;
  ingredient: TIngredient;
};

type TMenuItem = {
  icon: keyof TICons;
  href: string;
  text: string;
};

type TOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

type TOrdersMessage = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type { TFilling, TMenuItem, TOrder, TOrdersMessage };

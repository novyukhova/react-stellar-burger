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

export type { TFilling, TMenuItem };

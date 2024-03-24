import { Dispatch } from "redux";
import {
  TUser,
  loadUser as apiLoadUser,
  saveUser as apiSaveUser,
} from "../../utils/api";
import { loggedOut } from "./auth";
import { USER_LOADED } from "../constants/profile";
import { AppThunk } from "../types";

type TUserLoadedAction = {
  type: typeof USER_LOADED;
  user: TUser;
};

type TProfileAction = TUserLoadedAction;

function userLoaded(user: TUser): TUserLoadedAction {
  return {
    type: USER_LOADED,
    user,
  };
}

const loadUser: AppThunk = () => (dispatch: Dispatch) =>
  apiLoadUser()
    .then((res) => {
      dispatch(userLoaded(res.user));
    })
    .catch((err) => {
      if (err?.status === 401) {
        dispatch(loggedOut());
      }
    });

const saveUser: AppThunk =
  (name: string, email: string) => (dispatch: Dispatch) =>
    apiSaveUser({
      name: name,
      email: email,
    })
      .then((res) => dispatch(userLoaded(res.user)))
      .catch((err) => {
        if (err?.status === 401) {
          dispatch(loggedOut());
        }
      });

export { userLoaded, loadUser, saveUser };

export type { TProfileAction };

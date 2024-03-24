import { Dispatch } from "redux";
import {
  TUser,
  loadUser as apiLoadUser,
  saveUser as apiSaveUser,
} from "../../utils/api";
import { loggedOut } from "./auth";

const USER_LOADED = "USER_LOADED";

function userLoaded(user: TUser) {
  return {
    type: USER_LOADED,
    user,
  };
}

function loadUser() {
  return (dispatch: Dispatch) =>
    apiLoadUser()
      .then((res) => {
        dispatch(userLoaded(res.user));
      })
      .catch((err) => {
        if (err?.status === 401) {
          dispatch(loggedOut());
        }
      });
}

function saveUser(name: string, email: string) {
  return (dispatch: Dispatch) =>
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
}

export { USER_LOADED, userLoaded, loadUser, saveUser };

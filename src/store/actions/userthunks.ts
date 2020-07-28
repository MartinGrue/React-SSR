import { ThunkAction } from "redux-thunk";
import {Dispatch } from "redux";
import agent from "../../app/api/agent";
import { usersActions } from "./IActions";
import { usersState } from "../state/IState";

export const fetchUsers = (): ThunkAction<
  {},
  usersState,
  usersActions
> => async (dispatch: Dispatch<usersActions, usersState>) => {
  try {
    const users = await agent.User.fetchUser();
    console.log("in actionCollector");
    dispatch({ type: "fetch_users", payload: users });
  } catch (error) {
    console.log(error);
  }
};

import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import agent from "../api/agent";
import { IUser } from "../reducers";

export type MyActions = { type: "fetch_users"; payload: IUser[] };
export const FETCH_USERS = "fetch_users";
export const fetchUsers = (): ThunkAction<{}, unknown, Action> => async (
  dispatch
) => {
  try {
    const users = await agent.User.fetchUser();
    console.log("in actionCollector");
    dispatch<MyActions>({ type: "fetch_users", payload: users });
  } catch (error) {}
};

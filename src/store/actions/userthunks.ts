import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Dispatch, ActionCreator, Action } from "redux";
import agent from "../../app/api/agent";
import { usersActions } from "./IActions";
import { usersState } from "../state/IState";

export type MyThunkResult<R> = ThunkAction<
  R,
  usersState,
  undefined,
  usersActions
>;
export type MyThunkDispatch = ThunkDispatch<
  usersState,
  undefined,
  usersActions
>;

export const fetchUsers = (): MyThunkResult<Promise<void>> => async (
  dispatch: Dispatch<usersActions>
) => {
  try {
    const users = await agent.User.fetchUser();
    setTimeout(() => {
      dispatch({ type: "fetch_users", payload: users });
    }, 3000);
  } catch (error) {
    console.log(error);
  }
};

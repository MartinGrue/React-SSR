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
    dispatch({ type: "fetch_users", payload: users });
    console.log(`from the thunk: ${users[0].name}`);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsersSlow = (): MyThunkResult<Promise<void>> => async (
  dispatch: Dispatch<usersActions>
) => {
  try {
    const users = await agent.User.fetchUser();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("fetch slow in thunk is called");
    dispatch({ type: "fetch_users", payload: users });
  } catch (error) {
    console.log(error);
  }
};

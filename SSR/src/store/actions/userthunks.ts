import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Dispatch, ActionCreator, Action } from "redux";
import { usersActions } from "./IActions";
import { usersState } from "../state/IState";
import { Agent } from "../../app/api/createCustomAxios";
import { ICurrentUser, IUser, IUserRequest } from "../../app/models/IUser";

export type MyThunkResult<R> = ThunkAction<R, usersState, Agent, usersActions>;
export type MyThunkDispatch = ThunkDispatch<usersState, Agent, usersActions>;

export const fetchUsers = (): MyThunkResult<Promise<void>> => async (
  dispatch: Dispatch<usersActions>,
  getState: () => usersState,
  agent: Agent
) => {
  try {
    // const users = await agent.User.fetchUser();
    const users = await agent.User.fetchUser();
    dispatch({ type: "fetch_users", payload: users });
    console.log(`from the thunk: ${users[0].name}`);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsersSlow = (): MyThunkResult<Promise<void>> => async (
  dispatch: Dispatch<usersActions>,
  getState: () => usersState,
  agent: Agent
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

export const signIn = (
  user: IUserRequest
): MyThunkResult<Promise<IUser | undefined>> => async (
  dispatch: Dispatch<usersActions>,
  getState: () => usersState,
  agent: Agent
) => {
  try {
    // const users = await agent.User.fetchUser();
    console.log(
      `making request to: ${agent.axiosInstance.defaults.baseURL}/auth/signin`
    );
    const signInUser = await agent.User.signIn(user);
    console.log("got response: ", signInUser);
    dispatch({ type: "sign_in", payload: signInUser });
    return signInUser;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const fetchCurrentUser = (): MyThunkResult<Promise<void>> => async (
  dispatch: Dispatch<usersActions>,
  getState: () => usersState,
  agent: Agent
) => {
  try {
    // const users = await agent.User.fetchUser();
    console.log(
      `making request to: ${agent.axiosInstance.defaults.baseURL}/auth/currentuser`
    );
    const currentUser = await agent.User.fetchCurrentUser();

    console.log(`currentUser from thunk: ${currentUser.currentUser?.userId}`);
    dispatch({ type: "fetch_current_user", payload: currentUser });
  } catch (error) {
    console.log(error);
  }
};

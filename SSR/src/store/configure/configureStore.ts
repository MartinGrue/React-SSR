import { Store, createStore, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware, ThunkDispatch } from "redux-thunk";
import { usersState } from "../state/IState";
import usersReducer, { usersInitialState } from "../reducers/usersReducer";
import { usersActions } from "../actions/IActions";
import { Agent } from "../../app/api/createCustomAxios";
import { Request } from "express";

export type appStore = Store<usersState, usersActions> & {
  dispatch: ThunkDispatch<usersState, Agent, usersActions>;
};

export const configureStore = (
  usersInitialState: usersState | undefined = undefined,
  agent: Agent
): appStore => {
  const appstore = createStore(
    usersReducer,
    usersInitialState,
    applyMiddleware(thunk.withExtraArgument(agent))
  );
  return appstore;
};

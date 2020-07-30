import { Store, createStore, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware, ThunkDispatch } from "redux-thunk";
import { usersState } from "../state/IState";
import usersReducer, { usersInitialState } from "../reducers/usersReducer";
import { usersActions } from "../actions/IActions";

export type appStore = Store<usersState, usersActions> & {
  dispatch: ThunkDispatch<usersState, undefined, usersActions>;
};

export const configureStore = (usersInitialState: usersState): appStore => {
  const appstore = createStore(
    usersReducer,
    usersInitialState,
    applyMiddleware(thunk as ThunkMiddleware<usersState, usersActions>)
  );
  return appstore;
};
export const createAppStore = (): appStore => {
  const appstore = configureStore(usersInitialState);
  return appstore;
};

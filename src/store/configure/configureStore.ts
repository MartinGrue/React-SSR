import { Store, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { usersState } from "../state/IState";
import usersReducer from "../reducers/usersReducer";
import { usersActions } from "../actions/IActions";
export const configureStore = (usersInitialState: usersState): Store<usersState, usersActions> => {
  return createStore(usersReducer, usersInitialState, applyMiddleware(thunk));
};

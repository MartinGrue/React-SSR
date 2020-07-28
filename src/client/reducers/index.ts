import { combineReducers, Reducer } from "redux";
import usersReducer from "./usersReducer";
import { MyActions } from "../actions/actions";
export interface IUser {
  id: string;
  name: string;
}
export type MyState = { users: IUser[] };
export interface ApplicationState {
  mystate: MyState;
}

import { FETCH_USERS, MyActions } from "../actions/actions";
import { MyState } from ".";
import { Reducer } from "redux";

export const initialState: MyState = {
  users: new Array(),
};

const reducer: Reducer<MyState> = (
  state: MyState = { users: [] },
  action: any
) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};
export default reducer;

import { usersState } from "../state/IState";
import { usersActions } from "../actions/IActions";
import { Reducer } from "redux";

export const usersInitialState: usersState = {
  users: [],
};

const reducer: Reducer<usersState, usersActions> = (
  state: usersState = usersInitialState,
  action: usersActions
) => {
  switch (action.type) {
    case "fetch_users":
      return { ...state, users: action.payload };
    default:
      return state;
  }
};
export default reducer;
